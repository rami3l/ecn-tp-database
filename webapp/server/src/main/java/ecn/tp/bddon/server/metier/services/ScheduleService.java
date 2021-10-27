package ecn.tp.bddon.server.metier.services;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class ScheduleService {

    @Resource
    private StockListingService stockListingService;

    Map<String, ThreadPoolTaskScheduler> schedulers = new HashMap<>();

    public String addTask(String name, Runnable action, String cronExpression) {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        if (schedulers.containsKey(name)) {
            throw new RuntimeException("A task already exists with name " + name);
        }
        scheduler.initialize();
        scheduler.schedule(action, new CronTrigger(cronExpression));
        schedulers.put(name, scheduler);
        return name;
    }

    public String addTask(Runnable action, String cronExpression) {
        String name = UUID.randomUUID().toString();
        // the name should be unique
        while (schedulers.containsKey(name)) {
            name += "_";
        }
        return addTask(name, action, cronExpression);
    }

    public boolean removeTask(String name) {
        if (schedulers.containsKey(name)) {
            schedulers.get(name).destroy();
            schedulers.remove(name);
            return true;
        }
        return false;
    }

}