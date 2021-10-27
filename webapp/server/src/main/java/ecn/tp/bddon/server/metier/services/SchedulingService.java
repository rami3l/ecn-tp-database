package ecn.tp.bddon.server.metier.services;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@EnableScheduling
public class SchedulingService {

    @Resource
    private StockListingService stockListingService;

    Map<Integer, ThreadPoolTaskScheduler> schedulers = new HashMap<>();

    public int addTask(int id, Runnable action, String cronExpression) {
        if (schedulers.containsKey(id)) {
            throw new IllegalStateException("Task already exists");
        }
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.initialize();
        scheduler.schedule(action, new CronTrigger(cronExpression));
        schedulers.put(id, scheduler);
        log.info("New task scheduled with id {}", id);
        return id;
    }

    public int addTask(Runnable action, String cronExpression) {
        return addTask(getUniqueId(), action, cronExpression);
    }

    public int getUniqueId() {
        return Collections.max(schedulers.keySet()) + 1;
    }

    public boolean removeTask(int id) {
        if (schedulers.containsKey(id)) {
            schedulers.get(id).destroy();
            schedulers.remove(id);
            log.info("Task with id {} cancelled", id);
            return true;
        }
        return false;
    }

}