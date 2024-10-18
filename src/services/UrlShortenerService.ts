import UrlRepository from "@/repositories/UrlRepository";
import shortId from 'shortid';


export class UrlShortenerService{
    private urlRepository;
    constructor(){
        this.urlRepository=new UrlRepository();
    }
    async shortenUrl(originalUrl?:string):Promise<string>{
        if(!originalUrl){
            return "";
        }
        let url=await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url){
            return url.shortUrl;
        }
        let shortUrl=shortId();
        url=await this.urlRepository.getUrlByOriginalUrl(shortUrl);
        while(url){
            shortUrl=shortId();
            url=await this.urlRepository.getUrlByShortUrl(shortUrl);
        }

        await this.urlRepository.createUrl(originalUrl,shortUrl);
        return shortUrl;
    }
    async getAllUrls() {
        return await this.urlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortUrl: string) {
        return await this.urlRepository.getUrlByShortUrl(shortUrl);
    }
}
//The UrlShortenerService class is part of the service layer in 
//your application. This layer sits between your controllers (which handle HTTP requests) and 
//your repositories (which handle database interactions). 
//The service layer encapsulates the business logic of your application, ensuring that your controllers remain thin and focused solely on handling HTTP requests and responses.