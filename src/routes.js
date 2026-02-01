import IndexH from "./pages/IndexH/IndexH";
import CmsIndex from "./pages/CmsPages/CmsIndex/CmsIndex";
import CmsNUser from "./pages/CmsPages/CmsNUser/CmsNUser";
import CmsMenu from "./pages/CmsPages/CmsMenu/CmsMenu";
import ItemMenuB from "./components/CmsComponents/ItemMenuB/ItemMenuB";
import CmsCategory from "./pages/CmsPages/CmsCategory/CmsCategory";
import CmsSubject from "./pages/CmsPages/CmsSubject/CmsSubject";
import CmsCustomer from "./pages/CmsPages/CmsCustomer/CmsCustomer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Parameter from "./pages/CmsPages/Parameter/Parameter";
import CmsSkin from "./pages/CmsPages/CmsSkin/CmsSkin";
import CmsManufacturer from "./pages/CmsPages/CmsManufacturer/CmsManufacturer";
import CmsProduct from "./pages/CmsPages/CmsProduct/CmsProduct";
import CmsOrder from "./pages/CmsPages/CmsOrder/CmsOrder";
import CmsCategoryB from "./pages/CmsPages/CmsCategoryB/CmsCategoryB";
import UserEmail from "./pages/CmsPages/UserEmail/UserEmail";
import EditorExamole from "./EditorExamole";
import CmsWarranty from "./pages/CmsPages/CmsWarranty/CmsWarranty";
import CmsRepairs from "./pages/CmsPages/CmsRepairs/CmsRepairs";
import CmsTicket from "./pages/CmsPages/CmsTicket/CmsTicket";
import CmsSystemAsembly from "./pages/CmsPages/CmsSystemAsembly/CmsSystemAsembly";
import TestPage from "./pages/CmsPages/Test/TestPage";
import CmsCoupon from "./pages/CmsPages/CmsCoupon/CmsCoupon";
import AllProductInfo from "./pages/CmsPages/AllProductInfo/AllProductInfo";
import CmsFactor from "./pages/CmsPages/CmsFactor/CmsFactor";
import CmsFinance from "./pages/CmsPages/CmsFinance/CmsFinance";
import CmsVoucher from "./pages/CmsPages/CmsVoucher/CmsVoucher";
let routes = [
  { path: "/", element: <IndexH /> },
  { path: "/errorpage", element: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> },

  {
    path: "/p-admin",
    element: <CmsIndex />,

    children: [
      { path: "users", element: <CmsNUser /> },
      { path: "menu", element: <CmsMenu /> },
      { path: "menu/:id", element: <ItemMenuB /> },
      { path: "category", element: <CmsCategory /> },
      { path: "CmsSubject", element: <CmsSubject /> },
      { path: "customer", element: <CmsCustomer /> },
      { path: "parameter", element: <Parameter /> },
      { path: "skin", element: <CmsSkin /> },
      { path: "manufacturer", element: <CmsManufacturer /> },
      { path: "product", element: <CmsProduct /> },
      { path: "order", element: <CmsOrder /> },
      { path: "categoryspecialty", element: <CmsCategoryB /> },
      { path: "useremail", element: <UserEmail /> },
      { path: "edii", element: <EditorExamole /> },
      { path: "warranty", element: <CmsWarranty /> },
      { path: "repairs", element: <CmsRepairs /> },
      { path: "tickets", element: <CmsTicket /> },
      { path: "assemblypc", element: <CmsSystemAsembly /> },
      { path: "testpage", element: <TestPage /> },
      { path: "coupon", element: <CmsCoupon /> },
      { path: "allProductInfo", element: <AllProductInfo /> },
      { path: "Factor", element: <CmsFactor /> },
      { path: "finance", element: <CmsFinance /> },
      { path: "accounts", element: <CmsVoucher /> },
    ],
  },
];

export default routes;
