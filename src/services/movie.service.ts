import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type {
  AdminMovieRequest,
  MovieRequest,
} from '../types/schemas/MovieRequest.schema.js';
import { generateUniqueSlug } from '../helpers/string-utils.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import db from '../database/connection.js';
import collaboratorModel from '../models/collaborator.model.js';
import imageModel from '../models/image.model.js';
import AppError from '../helpers/AppError.js';
import type { MovieFindAllResponse } from '../types/interfaces/MovieFindAllResponse.interface.js';
import emailService from './email.service.js';
import movieUpdateModel from '../models/movie_update.model.js';

const create = async (movieRequest: MovieRequest): Promise<MovieResponse> => {
  try {
    await db.beginTransaction();
    const slug = await generateUniqueSlug(
      movieRequest.originalTitle,
      async (slug) => {
        const exists = await movieModel.getBySlug(slug);
        return !!exists;
      },
    );
    const movieId = await movieModel.create({ ...movieRequest, slug });
    await collaboratorModel.createDirector(movieRequest.director, movieId);
    await collaboratorModel.create(movieRequest.collaborators, movieId);
    await imageModel.insertMultiple(movieRequest.stillsUrls, movieId);
    await db.commit();
    const response: MovieResponse = {
      movieId: movieId,
    };
    return response;
  } catch (err) {
    console.error(err);
    await db.rollback();
    throw err;
  }
};
const getAll = async (
  page: number,
  type: string,
  search: string,
): Promise<MovieFindAllResponse> => {
  return await movieModel.getAll(page, type, search);
};

const getById = async (id: number): Promise<Movie> => {
  const movie = await movieModel.getById(id);
  if (!movie) throw new AppError(404, 'film not found');
  return movie;
};

const getBySlug = async (slug: string): Promise<Movie> => {
  const movie = await movieModel.getBySlug(slug);
  if (!movie) throw new AppError(404, 'film not found');
  return movie;
};

const remove = async (id: number): Promise<void> => {
  try {
    await db.beginTransaction();
    await collaboratorModel.remove(id);
    await imageModel.remove(id);

    const affectedRows = await movieModel.remove(id);

    if (affectedRows === 0) {
      throw new AppError(404, 'film not found');
    }

    await db.commit();
  } catch (err) {
    console.error(err);
    await db.rollback();
    throw err;
  }
};
const update = async (
  id: number,
  movieRequest: MovieRequest,
): Promise<number> => {
  if (movieRequest.originalTitle) {
    const slug = await generateUniqueSlug(
      movieRequest.originalTitle,
      async (slug) => {
        const existing = await movieModel.getBySlug(slug);
        return !!existing && existing.id !== id;
      },
    );
    movieRequest.slug = slug;
  }
  const affectedRows = await movieModel.update(id, movieRequest);
  if (affectedRows === 0) {
    throw new AppError(404, `movie not found`);
  }
  else{
    await movieUpdateModel.deleteByToken(movieRequest.token as string)
  }
  return affectedRows;
};

const getAllSorted = async (
  page: number,
  sort: string,
  order: string,
  onlyDrafts: boolean,
  search: string,
): Promise<MovieFindAllResponse> => {
  return await movieModel.getAllSorted(page, sort, order, onlyDrafts, search);
};

const adminUpdate = async (
  id: number,
  movieRequest: AdminMovieRequest,
): Promise<number> => {
  const { adminData, ...request } = movieRequest;
  const movie = await movieModel.getById(id);
  if (!movie) throw new AppError(404, 'film not found');
  switch(adminData.adminStatus){
    case "pending_change":
    {
      const token = crypto.randomUUID() as string;
      await emailService.statusUpdatePendingMail(adminData, movie, token);  
      await movieUpdateModel.create(movie.id!, token);
      break;
    }
    case "rejected":
    case "accepted":
    case "selected":
    case "winner":
      await emailService.statusUpdateMail(adminData, movie);
      break;
    default:
      throw new AppError(400, `wrong movie status`);
  }

  //TODO add transaction
  const affectedRows = await movieModel.update(id, request);
  if (affectedRows === 0) {
    throw new AppError(404, `movie not found`);
  }
  return affectedRows;
};

const movieService = {
  create,
  getAll,
  getById,
  getBySlug,
  remove,
  update,
  getAllSorted,
  adminUpdate,
};

export default movieService;


//in movie controller
// {
//  token: "cldl"
//   originalTitle: 'WedsadweqeqwQQQQQQQ',
//   englishTitle: 'Traduction anglaise',
//   videoPath: 'https://s3.fr-par.scw.cloud/lyn/jakah/video/55178626-9865-4450-97ee-0d742b554f8c.mp4',
//   coverPath: 'https://s3.fr-par.scw.cloud/lyn/jakah/coverImage/6991c5df-3d30-4359-aae9-dbe6460feb4f.png',
//   stillsUrls: [],
//   isHybrid: false,
//   language: 'DE',
//   originalSynopsis: 'Synopsis langue originale',
//   englishSynopsis: 'Synopsis anglais',
//   creativeProcess: 'Méthodologie créative',
//   aiTools: 'Stack technologique',
//   hasSubs: false,
//   director: {
//     firstname: 'Mme prenom',
//     lastname: 'nom',
//     gender: 'mr',
//     email: 'email@gmail.com',
//     job: 'metier actuel',
//     address: 'Adresse',
//     zipcode: 'Code postal',
//     city: 'Ville',
//     region: 'Région',
//     country: 'Pays ',
//     phone: '010101020203',
//     birthdate: '1111-11-11',
//     facebookUrl: 'Facebook',
//     instagramUrl: 'Instagram',
//     youtubeUrl: 'YouTube',
//     twitterUrl: 'Twitter',
//     linkedinUrl: 'LinkedIn'
//   },
//   collaborators: [],
//   duration: 24.2
// }



//in movie model
// {
//    token: "djflksj"
//   originalTitle: 'WedsadweqeqwQQQQQQQ',
//   englishTitle: 'Traduction anglaise',
//   videoPath: 'https://s3.fr-par.scw.cloud/lyn/jakah/video/55178626-9865-4450-97ee-0d742b554f8c.mp4',
//   coverPath: 'https://s3.fr-par.scw.cloud/lyn/jakah/coverImage/6991c5df-3d30-4359-aae9-dbe6460feb4f.png',
//   stillsUrls: [],
//   isHybrid: false,
//   language: 'DE',
//   originalSynopsis: 'Synopsis langue originale',
//   englishSynopsis: 'Synopsis anglais',
//   creativeProcess: 'Méthodologie créative',
//   aiTools: 'Stack technologique',
//   hasSubs: false,
//   director: {
//     firstname: 'Mme prenom',
//     lastname: 'nom',
//     gender: 'mr',
//     email: 'email@gmail.com',
//     job: 'metier actuel',
//     address: 'Adresse',
//     zipcode: 'Code postal',
//     city: 'Ville',
//     region: 'Région',
//     country: 'Pays ',
//     phone: '010101020203',
//     birthdate: '1111-11-11',
//     facebookUrl: 'Facebook',
//     instagramUrl: 'Instagram',
//     youtubeUrl: 'YouTube',
//     twitterUrl: 'Twitter',
//     linkedinUrl: 'LinkedIn'
//   },
//   collaborators: [],
//   duration: 24.2,
//   slug: 'wedsadweqeqwqqqqqqq'
// }
