import movieModel from '../models/movies.js';
import { UserDisplayName } from '../utils/index.js';

export function DisplayContactsList(req, res, next){
    movieModel.find(function(err, moviesCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Business Contacts List', page: 'contacts/list', movies: moviesCollection, displayName: UserDisplayName(req)});
    })
}

export function DisplayContactsAddPage(req, res, next){
    res.render('index', { title: 'Add Business Contact', page: 'contacts/edit', movie: {} , displayName: UserDisplayName(req)});
}

export function ProcessContactsAddPage(req, res, next){
    
    let newMovie = movieModel({
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime
    });

    movieModel.create(newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    } )
}

export function ProcessContactsEditPage(req, res, next){
    let id = req.params.id;

    movieModel.findById(id, (err, movie) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Business Contacts', page: 'contacts/edit', movie: contact, displayName: UserDisplayName(req) });
    });    
}

export function DisplayContactsEditPage(req, res, next){

    let id = req.params.id;
    
    let newMovie = movieModel({
        _id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime
    });

    movieModel.updateOne({_id: id }, newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    } )
}

export function ProcessContactsDelete(req, res, next){
    let id = req.params.id;

    movieModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    })
}

