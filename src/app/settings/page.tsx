"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const NAV=[{icon:"📊",label:"Dashboard",href:"/dashboard"},{icon:"🧪",label:"All Cylinders",href:"/cylinders"},{icon:"🔔",label:"Escalations",href:"/escalations"},{icon:"📤",label:"Issued",href:"/issued"},{icon:"↩",label:"Returned",href:"/returned"}];
const inp:any={width:"100%",padding:"10px 14px",border:"1.5px solid #E2E8F0",borderRadius:"8px",fontSize:"14px",outline:"none",color:"#1E293B",backgroundColor:"white"};
const lbl:any={display:"block",fontSize:"11px",fontWeight:"700",color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px"};
export default function SettingsPage(){
  const router=useRouter();
  const [rd,setRd]=useState({helium:"30",ammonia:"15",special:"45",calibration:"45"});
  const [ms,setMs]=useState({helium:"2",special:"2",calibration:"2"});
  const [em,setEm]=useState({reminder:"dept-head@cpcl.co.in, stores@cpcl.co.in",dgm:"dgm-stores@cpcl.co.in",gm:"gm@cpcl.co.in, dgm-stores@cpcl.co.in",stock:"stores@cpcl.co.in, mm-planning@cpcl.co.in"});
  const [saved,setSaved]=useState(false);
  const save=()=>{localStorage.setItem("cpcl_settings",JSON.stringify({rd,ms,em}));setSaved(true);setTimeout(()=>setSaved(false),3000);};
  return(
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#F1F5F9"}}>
      <div style={{width:"220px",backgroundColor:"#0F2D54",display:"flex",flexDirection:"column",padding:"20px 12px",position:"fixed",height:"100vh",top:0,left:0}}>
        <div style={{padding:"8px",marginBottom:"24px"}}><div style={{color:"white",fontWeight:"800",fontSize:"16px"}}>CPCL <span style={{color:"#E8820C"}}>CTM</span></div><div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px"}}>Cylinder Tracking Module</div></div>
        <div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",padding:"0 8px",marginBottom:"8px"}}>Main</div>
        {NAV.map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:"transparent",color:"white"}}><span>{item.icon}</span><span>{item.label}</span></button>))}
        <div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",padding:"12px 8px 8px"}}>Admin</div>
        <button onClick={()=>router.push("/cylinders/add")} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:"transparent",color:"white"}}><span>➕</span><span>Add Cylinder</span></button>
        <button onClick={()=>router.push("/settings")} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:"#E8820C",color:"white"}}><span>⚙</span><span>Settings</span></button>
        <div style={{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"4px 8px",marginBottom:"8px"}}><div style={{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:"#E8820C",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"700",fontSize:"13px"}}>A</div><div><div style={{color:"white",fontSize:"13px",fontWeight:"600"}}>Admin User</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>Administrator</div></div></div>
          <button onClick={()=>{localStorage.removeItem("cpcl_user");router.push("/login");}} style={{width:"100%",padding:"7px",backgroundColor:"transparent",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"6px",color:"rgba(255,255,255,0.6)",fontSize:"12px",cursor:"pointer"}}>Sign out</button>
        </div>
      </div>
      <div style={{marginLeft:"220px",flex:1,padding:"28px"}}>
        <div style={{backgroundColor:"white",padding:"16px 24px",borderRadius:"12px",marginBottom:"24px",border:"1px solid #E2E8F0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><h1 style={{fontSize:"20px",fontWeight:"700",color:"#0F2D54"}}>Settings</h1><p style={{fontSize:"13px",color:"#475569",marginTop:"2px"}}>Rental-free days, stock thresholds and email configuration</p></div>
          <button onClick={()=>router.push("/cylinders/add")} style={{backgroundColor:"#E8820C",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>+ Add Cylinder</button>
        </div>
        {saved&&<div style={{backgroundColor:"#DCFCE7",border:"1px solid #86EFAC",borderRadius:"10px",padding:"12px 18px",marginBottom:"20px",color:"#15803D",fontSize:"13px",fontWeight:"500"}}>✓ Settings saved successfully!</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"20px"}}>
          <div style={{backgroundColor:"white",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"24px"}}>
            <h3 style={{fontSize:"14px",fontWeight:"700",color:"#0F2D54",marginBottom:"20px"}}>Rental-Free Days by Category</h3>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Helium Gas</label><input style={inp} type="number" value={rd.helium} onChange={e=>setRd(r=>({...r,helium:e.target.value}))}/></div>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Ammonia Gas</label><input style={inp} type="number" value={rd.ammonia} onChange={e=>setRd(r=>({...r,ammonia:e.target.value}))}/></div>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Special Gas</label><input style={inp} type="number" value={rd.special} onChange={e=>setRd(r=>({...r,special:e.target.value}))}/></div>
            <div style={{marginBottom:"20px"}}><label style={lbl}>Calibration Gas</label><input style={inp} type="number" value={rd.calibration} onChange={e=>setRd(r=>({...r,calibration:e.target.value}))}/></div>
            <button onClick={save} style={{padding:"10px 24px",backgroundColor:"#0F2D54",color:"white",border:"none",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Save Settings</button>
          </div>
          <div style={{backgroundColor:"white",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"24px"}}>
            <h3 style={{fontSize:"14px",fontWeight:"700",color:"#0F2D54",marginBottom:"20px"}}>Minimum Stock Thresholds</h3>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Min. Helium Cylinders in Store</label><input style={inp} type="number" value={ms.helium} onChange={e=>setMs(m=>({...m,helium:e.target.value}))}/></div>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Min. Special Cylinders in Store</label><input style={inp} type="number" value={ms.special} onChange={e=>setMs(m=>({...m,special:e.target.value}))}/></div>
            <div style={{marginBottom:"16px"}}><label style={lbl}>Min. Calibration Cylinders in Store</label><input style={inp} type="number" value={ms.calibration} onChange={e=>setMs(m=>({...m,calibration:e.target.value}))}/></div>
            <div style={{backgroundColor:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:"8px",padding:"12px",marginBottom:"20px",fontSize:"12px",color:"#92400E"}}>⚠ Fortnightly stock alerts are sent to Stores and MM-Planning when stock drops below these levels.</div>
            <button onClick={save} style={{padding:"10px 24px",backgroundColor:"#0F2D54",color:"white",border:"none",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Save Settings</button>
          </div>
        </div>
        <div style={{backgroundColor:"white",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"24px"}}>
          <h3 style={{fontSize:"14px",fontWeight:"700",color:"#0F2D54",marginBottom:"20px"}}>Escalation Email Configuration</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"20px"}}>
            <div><label style={lbl}>1st Reminder - Recipients</label><input style={inp} type="text" value={em.reminder} onChange={e=>setEm(v=>({...v,reminder:e.target.value}))}/></div>
            <div><label style={lbl}>DGM Escalation (10th) - Recipients</label><input style={inp} type="text" value={em.dgm} onChange={e=>setEm(v=>({...v,dgm:e.target.value}))}/></div>
            <div><label style={lbl}>GM Escalation (20th) - Recipients</label><input style={inp} type="text" value={em.gm} onChange={e=>setEm(v=>({...v,gm:e.target.value}))}/></div>
            <div><label style={lbl}>Min Stock Alert - Recipients</label><input style={inp} type="text" value={em.stock} onChange={e=>setEm(v=>({...v,stock:e.target.value}))}/></div>
          </div>
          <button onClick={save} style={{padding:"10px 24px",backgroundColor:"#0F2D54",color:"white",border:"none",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Save Email Config</button>
        </div>
      </div>
    </div>
  );
}