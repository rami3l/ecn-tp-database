package ecn.tp.bddon.server.metier.services;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

    @Resource
    private StockListingService stockListingService;

    @Scheduled(cron = "0,30 * * * * *")
    public void sendStockListing() {
        System.out.println(stockListingService.getListing());
    }

}
