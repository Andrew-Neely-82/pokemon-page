import { TabPanel } from "@mui/lab";
import Main from "./main/Main";

const SearchTab = ({ style }) => {
  return (
    <TabPanel value="2" style={style}>
      <Main />
    </TabPanel>
  );
};
export default SearchTab;
