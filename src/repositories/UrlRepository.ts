import Url,{IUrl} from "@/models/Url";
import connectDB from "@/config/db";

export default class UrlRepository{
    private urlModel;
    constructor(){
        connectDB();
        this.urlModel=Url;
    }
    async getUrlById(id: string) : Promise<IUrl | null> {//This is an asynchronous method that retrieves a URL document by its unique MongoDB ID. It returns a Promise that resolves either to an IUrl object (if found) or null
        return await this.urlModel.findById(id).lean();//The findById method searches for a document by its ID. .lean() optimizes the query to return plain JavaScript objects instead of full Mongoose documents, which improves performance.
    }

    async getUrlByShortUrl(shortUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.findOne({shortUrl}).lean();
    }

    async getUrlByOriginalUrl(originalUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.findOne({originalUrl}).lean();
    }

    async getAllUrls() : Promise<IUrl[]> {
        return this.urlModel.find().lean<IUrl[]>();
    }

    async deleteUrl(id: string) : Promise<IUrl | null> {
        return await this.urlModel.findByIdAndDelete(id).lean();
    }

    async createUrl(originalUrl: string, shortUrl: string) : Promise<IUrl> {
        return await this.urlModel.create({shortUrl, originalUrl});
    }
}
//you're setting up the data access layer
// for interacting with the database. This is called a repository pattern,