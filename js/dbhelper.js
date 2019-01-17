/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 8000 // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

  /**
   * Get a image set
   */
  static imageSet(restaurant) {
    var srcset, src, alt;    
    switch(DBHelper.imageUrlForRestaurant(restaurant)) {
      case '/img/1.jpg':
      srcset='/img/1_tpzqwr_c_scale,w_200.jpg 200w,\
  /img/1_tpzqwr_c_scale,w_335.jpg 335w,\
  /img/1_tpzqwr_c_scale,w_435.jpg 435w,\
  /img/1_tpzqwr_c_scale,w_540.jpg 540w,\
  /img/1_tpzqwr_c_scale,w_600.jpg 600w'
      src='/img/1_tpzqwr_c_scale,w_600.jpg'
      break;
      case '/img/2.jpg':
      srcset='/img/2_tllbqw_c_scale,w_200.jpg 200w,\
  /img/2_lhyvgb_c_scale,w_339.jpg 339w,\
  /img/2_lhyvgb_c_scale,w_459.jpg 459w,\
  /img/2_lhyvgb_c_scale,w_559.jpg 559w,\
  /img/2_lhyvgb_c_scale,w_600.jpg 600w'
      src='/img/2_lhyvgb_c_scale,w_600.jpg'
      break;
      case '/img/3.jpg':
      srcset='/img/3_kr5pzm_c_scale,w_200.jpg 200w,\
  /img/3_kr5pzm_c_scale,w_331.jpg 331w,\
  /img/3_kr5pzm_c_scale,w_430.jpg 430w,\
  /img/3_kr5pzm_c_scale,w_537.jpg 537w,\
  /img/3_kr5pzm_c_scale,w_600.jpg 600w'
      src='/img/3_kr5pzm_c_scale,w_600.jpg'
      break;
      case '/img/4.jpg':
      srcset='/img/4_airi65_c_scale,w_200.jpg 200w,\
  /img/4_airi65_c_scale,w_344.jpg 344w,\
  /img/4_airi65_c_scale,w_455.jpg 455w,\
  /img/4_airi65_c_scale,w_547.jpg 547w,\
  /img/4_airi65_c_scale,w_600.jpg 600w'
      src='/img/4_airi65_c_scale,w_600.jpg'
      break;
      case '/img/5.jpg':
      srcset='/img/5_qbrrlm_c_scale,w_200.jpg 200w,\
  /img/5_qbrrlm_c_scale,w_335.jpg 335w,\
  /img/5_qbrrlm_c_scale,w_435.jpg 435w,\
  /img/5_qbrrlm_c_scale,w_538.jpg 538w,\
  /img/5_qbrrlm_c_scale,w_600.jpg 600w'
      src='/img/5_qbrrlm_c_scale,w_600.jpg'
      break;
      case '/img/6.jpg':
      srcset='/img/6_jwpx9f_c_scale,w_200.jpg 200w,\
  /img/6_jwpx9f_c_scale,w_346.jpg 346w,\
  /img/6_jwpx9f_c_scale,w_456.jpg 456w,\
  /img/6_jwpx9f_c_scale,w_549.jpg 549w,\
  /img/6_jwpx9f_c_scale,w_600.jpg 600w'
      src='/img/6_jwpx9f_c_scale,w_600.jpg'
      break;
      case '/img/7.jpg':
      srcset='/img/7_defcje_c_scale,w_200.jpg 200w,\
  /img/7_defcje_c_scale,w_336.jpg 336w,\
  /img/7_defcje_c_scale,w_435.jpg 435w,\
  /img/7_defcje_c_scale,w_540.jpg 540w,\
  /img/7_defcje_c_scale,w_600.jpg 600w'
      src='/img/7_defcje_c_scale,w_600.jpg'
      break;
      case '/img/8.jpg':
      srcset = '/img/8_vyxo68_c_scale,w_200.jpg 200w,\
        /img/8_vyxo68_c_scale,w_332.jpg 332w,\
        /img/8_vyxo68_c_scale,w_432.jpg 432w,\
        /img/8_vyxo68_c_scale,w_536.jpg 536w,\
        /img/8_vyxo68_c_scale,w_600.jpg 600w'
      src = '/img/8_vyxo68_c_scale,w_600.jpg'
      break;
      case '/img/9.jpg':
      srcset='/img/9_gjwvcy_c_scale,w_200.jpg 200w,\
  /img/9_gjwvcy_c_scale,w_329.jpg 329w,\
  /img/9_gjwvcy_c_scale,w_429.jpg 429w,\
  /img/9_gjwvcy_c_scale,w_534.jpg 534w,\
  /img/9_gjwvcy_c_scale,w_600.jpg 600w'
      src='/img/9_gjwvcy_c_scale,w_600.jpg'
      break;
      case '/img/10.jpg':
      srcset='/img/10_ow5lfa_c_scale,w_200.jpg 200w,\
  /img/10_ow5lfa_c_scale,w_343.jpg 343w,\
  /img/10_ow5lfa_c_scale,w_455.jpg 455w,\
  /img/10_ow5lfa_c_scale,w_555.jpg 555w,\
  /img/10_ow5lfa_c_scale,w_600.jpg 600w'
      src='/img/10_ow5lfa_c_scale,w_600.jpg'
      break;
    }
    alt = restaurant.name + ' restaurant image';
    return {srcset: srcset, src: src, alt: alt};
  }

  static imagePath(restaurant) {
    const image = document.createElement('img');
    image.className = 'restaurant-img';
    image.sizes = '(max-width: 600px) 100vw, 600px'
    switch(DBHelper.imageUrlForRestaurant(restaurant)) {
      case '/img/1.jpg':
      image.srcset='/img/1_tpzqwr_c_scale,w_200.jpg 200w,\
  /img/1_tpzqwr_c_scale,w_335.jpg 335w,\
  /img/1_tpzqwr_c_scale,w_435.jpg 435w,\
  /img/1_tpzqwr_c_scale,w_540.jpg 540w,\
  /img/1_tpzqwr_c_scale,w_600.jpg 600w'
      image.src='/img/1_tpzqwr_c_scale,w_600.jpg'
      break;
      case '/img/2.jpg':
      image.srcset='/img/2_tllbqw_c_scale,w_200.jpg 200w,\
  /img/2_lhyvgb_c_scale,w_339.jpg 339w,\
  /img/2_lhyvgb_c_scale,w_459.jpg 459w,\
  /img/2_lhyvgb_c_scale,w_559.jpg 559w,\
  /img/2_lhyvgb_c_scale,w_600.jpg 600w'
      image.src='/img/2_lhyvgb_c_scale,w_600.jpg'
      break;
      case '/img/3.jpg':
      image.srcset='/img/3_kr5pzm_c_scale,w_200.jpg 200w,\
  /img/3_kr5pzm_c_scale,w_331.jpg 331w,\
  /img/3_kr5pzm_c_scale,w_430.jpg 430w,\
  /img/3_kr5pzm_c_scale,w_537.jpg 537w,\
  /img/3_kr5pzm_c_scale,w_600.jpg 600w'
      image.src='/img/3_kr5pzm_c_scale,w_600.jpg'
      break;
      case '/img/4.jpg':
      image.srcset='/img/4_airi65_c_scale,w_200.jpg 200w,\
  /img/4_airi65_c_scale,w_344.jpg 344w,\
  /img/4_airi65_c_scale,w_455.jpg 455w,\
  /img/4_airi65_c_scale,w_547.jpg 547w,\
  /img/4_airi65_c_scale,w_600.jpg 600w'
      image.src='/img/4_airi65_c_scale,w_600.jpg'
      break;
      case '/img/5.jpg':
      image.srcset='/img/5_qbrrlm_c_scale,w_200.jpg 200w,\
  /img/5_qbrrlm_c_scale,w_335.jpg 335w,\
  /img/5_qbrrlm_c_scale,w_435.jpg 435w,\
  /img/5_qbrrlm_c_scale,w_538.jpg 538w,\
  /img/5_qbrrlm_c_scale,w_600.jpg 600w'
      image.src='/img/5_qbrrlm_c_scale,w_600.jpg'
      break;
      case '/img/6.jpg':
      image.srcset='/img/6_jwpx9f_c_scale,w_200.jpg 200w,\
  /img/6_jwpx9f_c_scale,w_346.jpg 346w,\
  /img/6_jwpx9f_c_scale,w_456.jpg 456w,\
  /img/6_jwpx9f_c_scale,w_549.jpg 549w,\
  /img/6_jwpx9f_c_scale,w_600.jpg 600w'
      image.src='/img/6_jwpx9f_c_scale,w_600.jpg'
      break;
      case '/img/7.jpg':
      image.srcset='/img/7_defcje_c_scale,w_200.jpg 200w,\
  /img/7_defcje_c_scale,w_336.jpg 336w,\
  /img/7_defcje_c_scale,w_435.jpg 435w,\
  /img/7_defcje_c_scale,w_540.jpg 540w,\
  /img/7_defcje_c_scale,w_600.jpg 600w'
      image.src='/img/7_defcje_c_scale,w_600.jpg'
      break;
      case '/img/8.jpg':
      image.srcset = '/img/8_vyxo68_c_scale,w_200.jpg 200w,\
        /img/8_vyxo68_c_scale,w_332.jpg 332w,\
        /img/8_vyxo68_c_scale,w_432.jpg 432w,\
        /img/8_vyxo68_c_scale,w_536.jpg 536w,\
        /img/8_vyxo68_c_scale,w_600.jpg 600w'
      image.src = '/img/8_vyxo68_c_scale,w_600.jpg'
      break;
      case '/img/9.jpg':
      image.srcset='/img/9_gjwvcy_c_scale,w_200.jpg 200w,\
  /img/9_gjwvcy_c_scale,w_329.jpg 329w,\
  /img/9_gjwvcy_c_scale,w_429.jpg 429w,\
  /img/9_gjwvcy_c_scale,w_534.jpg 534w,\
  /img/9_gjwvcy_c_scale,w_600.jpg 600w'
      image.src='/img/9_gjwvcy_c_scale,w_600.jpg'
      break;
      case '/img/10.jpg':
      image.srcset='/img/10_ow5lfa_c_scale,w_200.jpg 200w,\
  /img/10_ow5lfa_c_scale,w_343.jpg 343w,\
  /img/10_ow5lfa_c_scale,w_455.jpg 455w,\
  /img/10_ow5lfa_c_scale,w_555.jpg 555w,\
  /img/10_ow5lfa_c_scale,w_600.jpg 600w'
      image.src='/img/10_ow5lfa_c_scale,w_600.jpg'
      break;
    }
    image.alt = restaurant.name + ' restaurant image';
    return image;
  }

  /**
   * Map marker for a restaurant.
   */
   static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
      })
      marker.addTo(newMap);
    return marker;
  }
  /* static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  } */

}
