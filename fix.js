const fs = require('fs');
let code = fs.readFileSync('src/app/cylinders/page.tsx', 'utf8');

// Remove export button from non-admin view by wrapping it with isAdmin check
const oldBtn = '<a href="http://localhost:4000/api/export/excel" download="CPCL_Cylinders.csv" style={{backgroundColor:"#15803D",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"}}>⬇ Export Excel</a>';

const newBtn = '{isAdmin&&<a href="http://localhost:4000/api/export/excel" download="CPCL_Cylinders.xlsx" style={{backgroundColor:"#15803D",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"}}>Export Excel</a>}';

if (code.includes(oldBtn)) {
  code = code.replace(oldBtn, newBtn);
  fs.writeFileSync('src/app/cylinders/page.tsx', code, 'utf8');
  console.log('Fixed! Export button now admin only!');
} else {
  console.log('Button not found - checking current code...');
  const i = code.indexOf('Export');
  console.log(code.substring(i-100, i+200));
}