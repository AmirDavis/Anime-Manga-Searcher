import { useEffect, useState } from "react";
import "../styles/anime-card.css";

export default function RetrievedAnime({ searchValue }) {
  const [animeData, setAnimeData] = useState(null);

  var query = `
    query Media($search: String) {
    Media(search: $search) {
        id
        type
        status
        description
        episodes
        chapters
        volumes
        meanScore
        title {
            english
            native
        }
        coverImage {
            large
        }
    }
}
`;
  var variables = {
    search: searchValue,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  useEffect(() => {
    async function fetchAnime() {
      try {
        await fetch(url, options)
          .then(handleResponse)
          .then(handleData)
          .catch(handleError);
      } catch {
        console.error("Error fetching data:", error);
      }
    }
    fetchAnime();
  }, [searchValue]);
  //fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log(data);
    setAnimeData(data.data.Media);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  return (
    <div className="anime-card">
      {animeData ? (
        <>
          <img
            className="anime-img"
            src={animeData.coverImage.large}
            alt="Cover"
          />
          <h1 className="anime-title">
            {animeData.title.english || animeData.title.native}
          </h1>
          <p className="anime-description">{animeData.description}</p>
        </>
      ) : (
        <p>Loading...</p> // Show a loading message while the data is being fetched
      )}
    </div>
  );
}
