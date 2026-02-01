import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";
import { getProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();
    setUser(data);
  };

  if (!user) return <p className="p-8">Loading profile...</p>;

  return (
    <div className="flex min-h-screen bg-[#f6f8fc]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <CoderNavbar />

        <div className="p-10">
          <div className="bg-white rounded-2xl shadow-sm p-10 max-w-2xl">

            <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

            <div className="space-y-4 text-lg">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toDateString()}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
