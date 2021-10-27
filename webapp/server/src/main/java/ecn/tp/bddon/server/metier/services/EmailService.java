package ecn.tp.bddon.server.metier.services;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.checkerframework.checker.nullness.qual.Nullable;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class EmailService {

    @Resource
    private JavaMailSender mailSender;
    @Resource
    private MailProperties mailProperties;

    public void email(String email, String subject, String body) {
        email(email, subject, body, null);
    }

    public void email(String toEmail, String subject, String body, @Nullable Map<String, byte[]> files) {
        log.debug("Sending email from {} to {} through {}:{}", mailProperties.getUsername(), toEmail,
                mailProperties.getHost(), mailProperties.getPort());
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.toString());
            messageHelper.setSubject(subject);
            messageHelper.setText(body, true);
            messageHelper.setFrom(mailProperties.getUsername());
            messageHelper.setTo(toEmail);
            if (files != null) {
                for (var file : files.entrySet()) {
                    messageHelper.addAttachment(file.getKey(), new ByteArrayResource(file.getValue()));
                }
            }
            mailSender.send(message);
            log.info("Email sent successfully to {}", toEmail);
        } catch (MessagingException ex) {
            log.error("Failed to send email to {} : {} ", toEmail, ex);
        }
    }

}