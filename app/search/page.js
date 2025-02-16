async function getSearchResults(query) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const videos = await getSearchResults(query);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id.videoId} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{video.snippet.title}</h2>
            <p className="text-gray-400">{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
