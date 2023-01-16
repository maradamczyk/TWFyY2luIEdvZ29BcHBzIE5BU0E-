import { Container } from 'typedi';
import { NasaService } from '../src/infrastructure/services/nasa.service.js';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Get NASA pictures', () => {
    it('returns photo url from NASA API', async () => {
        const service = Container.get(NasaService);

        const responseMock = {
            data: {
                copyright: 'Amir H. Abolfath',
                date: '2019-12-06',
                explanation: '( .)',
                hdurl: 'https: /apod.nasa.gov/apod/image/1912/TaurusAbolfath.jpg',
                media_type: 'image',
                service_version: 'v1',
                title: 'Pleiades to Hyades',
                url: 'https: /apod.nasa.gov/apod/image/1912/TaurusAbolfath1024.jpg',
            },
        };

        mockedAxios.get.mockResolvedValue(responseMock);

        const response = await service.fetchPictures('2023-01-15', '2023-01-15');

        const expected = [
            'https: /apod.nasa.gov/apod/image/1912/TaurusAbolfath1024.jpg',
        ];

        expect(response.urls).toEqual(expect.arrayContaining(expected));
    });
});
