import 'whatwg-fetch';
const queryString = require('querystring');
import { getToken , cleanUserInfo } from '../stores/UserStore.js';
import { getAuthorizeURL } from '../lib/wechat'
const notification = console.log;
import { apiServer } from '../env_config';

const API_BASE_URL = apiServer.domain + ':' + apiServer.port + apiServer.prefix;


function checkStatus ( response ) {
	if ( response.status >= 200 && response.status < 300 ) {
		return response
	} else if ( response.status === 401 ) {
		cleanUserInfo();
			return window.location.href=getAuthorizeURL( window.location.href );
	} else {
		const error = new Error( response.statusText );
		error.status = response.status;
		error.response = response;
		throw error
	}
}

function parseJSON ( response ) {
	return response.json()
}

export function post ( path , body = {} ) {
	return new Promise( ( resolve , reject ) => {
		fetch( API_BASE_URL + path , {
			method: 'POST' ,
			headers: {
				'Content-Type': 'application/json' ,
				'authorization': getToken()
			} ,
			body: JSON.stringify( body )
		} )
			.then( checkStatus )
			.then( parseJSON )
			.then( function ( data ) {
				console.log( 'request succeeded with JSON response' , data );
				if ( data.errno ) {
					return reject( data )
				}

				if ( data.hasOwnProperty( "errno" ) && !data.errno ) {
					return resolve( data.data );
				}

				resolve( data );
			} )
			.catch( function ( error ) {
				console.log( error.message );
				notification( "error" , "服务器错误" , (error.status || 'Error') + ':' + error.toString() );
				reject( error );
			} )
	} )
}

export function get ( path , query ) {
	if(query){
		query = queryString.stringify( query  );
		path=path +'?'+ query
	}
	return new Promise( ( resolve , reject ) => {
		fetch( API_BASE_URL + path , {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded' ,
				'authorization': getToken()
			}
		} )
			.then( checkStatus )
			.then( parseJSON )
			.then( function ( data ) {
				console.log( 'request succeeded with JSON response' , data );

				if ( data.errno ) {
					return reject( data.errmsg || data.errno )
				}

				if ( data.hasOwnProperty( "errno" ) && !data.errno ) {
					return resolve( data.data );
				}
				resolve( data );

			} )
			.catch( function ( error ) {
				console.log( 'request failed' , error );
				reject( error );
			} )
	} )
}
