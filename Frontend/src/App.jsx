import { Toaster } from "react-hot-toast";
import PageRouters from "./Routes/Routes";

function App() {
  return (
    <div className="min-h-screen">
      <Toaster />
      <PageRouters />
    </div>
  );
}

export default App;
