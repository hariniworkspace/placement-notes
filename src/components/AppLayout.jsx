import { Outlet, useNavigation } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";

const AppLayout = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <GlobalLoader loading={loading} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
