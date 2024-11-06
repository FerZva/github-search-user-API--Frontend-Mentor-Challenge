import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ThemeToggle from "./services/ThemeSwitcher";
import { FaTwitter, FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";

function App() {
  const [username, setUserName] = useState("");
  const [query, setQuery] = useState("mojombo");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await fetch(`https://api.github.com/users/${query}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [query]); // Dependencia sobre query

  const handleInputValue = (e) => {
    setUserName(e.target.value);
  };

  const handleSearchUser = () => {
    setQuery(username);
  };

  // Function to format the creation date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen w-full flex font-mono justify-center items-center bg-slate-100 dark:bg-slate-900 px-1">
      <div className="w-full">
        <header className="max-w-[730px] m-auto w-full flex justify-between items-center my-14">
          <h1 className="text-[26px] leading-7 dark:text-white">
            <strong>Devfinder</strong>
          </h1>
          <ThemeToggle />
        </header>

        <div className="m-auto bg-white flex flex-row justify-between max-w-[730px] w-full items-center py-2 px-4 rounded-md dark:bg-slate-800 shadow-md dark:shadow-none">
          <div className="text-blue-700 flex items-center flex-row">
            <CiSearch className="text-[23px] mr-3" />
            <input
              type="text"
              placeholder="Search Github username..."
              value={username}
              onChange={handleInputValue}
              className="outline-none dark:bg-slate-800 w-full max-w-[400px]"
            />
          </div>
          <div className="flex flex-row items-center">
            <button
              onClick={handleSearchUser}
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 hover:bg-blue-400"
            >
              Search
            </button>
          </div>
        </div>

        <main className="m-auto bg-white p-1 md:p-6 flex flex-row justify-between max-w-[730px] w-full h-auto items-center py-2 px-4 rounded-md dark:bg-slate-800 my-14 shadow-md dark:shadow-none">
          {/* Head */}
          {loading ? (
            <p>Loading...</p>
          ) : userData && userData.message !== "Not Found" ? (
            <div className="bg-white p-1 md:p-6 w-full rounded-lg dark:bg-slate-800 flex flex-col justify-between m-auto text-black dark:text-white">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between">
                <div className="min-w-36">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="w-36 h-36 rounded-full p-4 m-auto"
                  />
                </div>
                <div className="p-1 md:p-4 w-full flex justify-between items-start flex-wrap">
                  <div className="">
                    <p className="">{userData.login}</p>
                    <p className="text-blue-700">{"@" + userData.login}</p>
                    {userData.bio ? (
                      <p className="">{userData.bio}</p>
                    ) : (
                      <p className="">No bio found</p>
                    )}
                  </div>
                  <div className="md:px-4 text-left md:text-right min-w-72">
                    <p className="text-slate-700 dark:text-white">
                      {"Joined " + formatDate(userData.created_at)}
                    </p>
                  </div>
                  <div className="w-full mx-1 my-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg px-1 md:px-2 py-4 flex justify-center text-center md:text-left md:justify-between flex-wrap">
                      <div className="flex flex-col mx-4">
                        <h3 className="text-slate-700 dark:text-white">
                          Repos
                        </h3>
                        <p className="text-[35px] font-bold">
                          {userData.public_repos}
                        </p>
                      </div>
                      <div className="flex flex-col mx-4">
                        <h3 className="text-slate-700 dark:text-white">
                          Followers
                        </h3>
                        <p className="text-[35px] font-bold">
                          {userData.followers}
                        </p>
                      </div>
                      <div className="flex flex-col mx-4">
                        <h3 className="text-slate-700 dark:text-white">
                          Following
                        </h3>
                        <p className="text-[35px] font-bold">
                          {userData.following}
                        </p>
                      </div>
                    </div>
                    <div className="my-8 flex flex-wrap justify-between">
                      <div className="flex items-center my-4">
                        <FaLocationDot className="text-slate-700 dark:text-white" />
                        &nbsp;&nbsp;
                        {userData.location ? (
                          <p className="text-slate-700 dark:text-white">
                            {userData.location}
                          </p>
                        ) : (
                          <p className="text-slate-700 dark:text-white">
                            No location found
                          </p>
                        )}
                      </div>
                      <div className="flex items-center my-4">
                        <FaTwitter className="text-slate-700 dark:text-white" />
                        &nbsp;&nbsp;
                        {userData.twitter_username ? (
                          <p className="text-slate-700 dark:text-white">
                            {userData.twitter_username}
                          </p>
                        ) : (
                          <p className="text-slate-700">No user found</p>
                        )}
                      </div>
                      <div className="flex items-center mt-4">
                        <FaLink className="text-slate-700 dark:text-white" />
                        &nbsp;&nbsp;
                        {userData.blog ? (
                          <p className="max-w-[202px] text-slate-700 dark:text-white">
                            {userData.blog}
                          </p>
                        ) : (
                          <p>No blog found.</p>
                        )}
                      </div>
                      <div className="flex items-center mt-4">
                        <BsBuildingsFill className="text-slate-700 dark:text-white" />
                        &nbsp;&nbsp;
                        {userData.company ? (
                          <p className="max-w-[180px] text-slate-700 dark:text-white text-wrap">
                            {userData.company}
                          </p>
                        ) : (
                          <p>No company found.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Header */}
            </div>
          ) : (
            query && <p className="text-center text-gray-500">User not found</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
