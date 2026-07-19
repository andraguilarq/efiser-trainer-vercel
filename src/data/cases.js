import case001 from "./cases/nephrology/case001.json";
import case002 from "./cases/nephrology/case002.json";
import case003 from "./cases/nephrology/case003.json";
import case004 from "./cases/nephrology/case004.json";
import case005 from "./cases/nephrology/case005.json";
import case006 from "./cases/nephrology/case006.json";
import case007 from "./cases/nephrology/case007.json";
import case008 from "./cases/nephrology/case008.json";
import case009 from "./cases/nephrology/case009.json";
import case010 from "./cases/nephrology/case010.json";
import caseSeries from "./caseSeries";
import extraCases from "./extraCases";

const cases = [
  case001,
  case002,
  case003,
  case004,
  case005,
  case006,
  case007,
  case008,
  case009,
  case010,
  ...caseSeries,
  ...extraCases,
];

export default cases;
