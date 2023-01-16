import axios from 'axios';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { Service } from 'typedi';
import config from '../../config.js';
import { NasaResponse } from '../../domain/models/nasaResponse.js';
import { GetPicturesService } from '../../domain/services/get-pictures.interface.js';

@Service()
export class NasaService implements GetPicturesService {
    private readonly _apiKey?: string;
    private readonly _concurrentRequests?: number;
    private readonly _url?: string;

    constructor() {
        this._apiKey = config.nasaApiKey;
        this._concurrentRequests = config.concurrentRequests;
        this._url = config.nasaUrl;
    }

    fetchPictures = async (
        from: string,
        to?: string
    ): Promise<FetchPicturesResponse> => {
        const startDate = DateTime.fromISO(from).startOf('day');
        const endDate = to
            ? DateTime.fromISO(to).startOf('day')
            : DateTime.now().startOf('day');

        const dates = [];
        for (let day = startDate; day <= endDate; day = day.plus({ day: 1 })) {
            dates.push(day.toISODate());
        }

        const responses = [];
        const dateChunks = _.chunk(dates, this._concurrentRequests);
        for (const chunk of dateChunks) {
            const data = await this.sendRequest(chunk);
            responses.push(data);
        }

        const urls = _.flatten(responses).map((x) => x.url);
        return { urls };
    };

    private sendRequest = async (chunk: string[]): Promise<NasaResponse[]> => {
        const requests = [];

        for (const date of chunk) {
            requests.push(
                axios.get(`${this._url}/planetary/apod`, {
                    params: {
                        api_key: this._apiKey,
                        date,
                    },
                })
            );
        }

        const responses = await Promise.all(requests);

        return responses.map((res) => res.data);
    };
}
