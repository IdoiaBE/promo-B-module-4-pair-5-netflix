// login

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  console.log(params);
  
  return fetch(`http://localhost:4000/moviesFilter?genre=${params.genre}&sort=${params.sort}&title${params.title}`, { method: 'GET'}
  )
  
    .then(response => response.json())
    .then(data => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;
        // success: true,
        // movies: [
        //   {
        //     id: '1',
        //     title: 'Gambita de dama',
        //     genre: 'Drama',
        //     image:
        //       '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
        //   },
        //   {
        //     id: '2',
        //     title: 'Friends',
        //     genre: 'Comedia',
        //     image:
        //       '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg'
        //   }
        // ]
      });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
