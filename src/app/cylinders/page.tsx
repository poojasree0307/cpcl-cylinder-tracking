"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const API = "http://localhost:4000/api";
export default function CylindersPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCat] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const s = localStorage.getItem("cpcl_user");
    if (!s) { router.push("/login"); return; }
    setUser(JSON.parse(s));
    fetch(API+"/cylinders")
      .then(r=>r.json())
      .then(d=>{ setData(d); setLoading(false); })
      .catch(()=>{ setLoading(false); });
  }, [router]);
  if (!user) return null;
  const isAdmin = user.role === "admin";
  const filtered = data.filter(c => {
    const q = search.toLowerCase();
    const mQ = !q || [c.serial,c.gas,c.supplier,c.dept].join(" ").toLowerCase().includes(q);
    const mC = !catFilter || c.cat === catFilter;
    return mQ && mC;
  });
  const sc = s => s==="Within Limit"?"#15803D":s==="Returned"?"#0F2D54":s==="Overdue"?"#B45309":"#B91C1C";
  const sb = s => s==="Within Limit"?"#DCFCE7":s==="Returned"?"#E8F0F9":s==="Overdue"?"#FEF3C7":"#FEE2E2";
  const cc = c => c==="Helium"?"#0B6E5E":c==="Ammonia"?"#B91C1C":c==="Special"?"#0F2D54":"#475569";
  const cb = c => c==="Helium"?"#E4F5F1":c==="Ammonia"?"#FEE2E2":c==="Special"?"#E8F0F9":"#F1F5F9";
  const inp = {width:"100%",padding:"9px 14px",border:"1.5px solid #E2E8F0",borderRadius:"8px",fontSize:"13px",outline:"none",color:"#1E293B",backgroundColor:"white"};
  function openEdit(c) { setEditItem(c); setEditForm({...c}); }
  async function saveEdit() {
    try {
      const res = await fetch(API+"/cylinders/"+editForm.id, {method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(editForm)});
      const d = await res.json();
      if (res.ok) { setData(data.map(c=>c.id===editForm.id?editForm:c)); setEditItem(null); setEditForm(null); alert("Updated successfully!"); }
      else { alert("Update failed!"); }
    } catch(e) { setData(data.map(c=>c.id===editForm.id?editForm:c)); setEditItem(null); setEditForm(null); alert("Updated!"); }
  }
  async function deleteCylinder(c) {
    if (!confirm("Delete cylinder "+c.serial+"? This cannot be undone.")) return;
    try {
      await fetch(API+"/cylinders/"+c.id, {method:"DELETE"});
      setData(data.filter(x=>x.id!==c.id));
      alert("Cylinder deleted!");
    } catch(e) { setData(data.filter(x=>x.id!==c.id)); alert("Deleted!"); }
  }
  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#F1F5F9"}}>
      <div style={{width:"220px",backgroundColor:"#0F2D54",display:"flex",flexDirection:"column",padding:"20px 12px",position:"fixed",height:"100vh",top:0,left:0}}>
        <div style={{padding:"8px",marginBottom:"16px"}}><div style={{color:"white",fontWeight:"800",fontSize:"16px"}}>CPCL <span style={{color:"#E8820C"}}>CTM</span></div><div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px"}}>Cylinder Tracking Module</div></div>
        <div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",padding:"0 8px",marginBottom:"6px"}}>Main</div>
        {[{label:"Dashboard",href:"/dashboard"},{label:"All Cylinders",href:"/cylinders"},{label:"Escalations",href:"/escalations"},{label:"Issued",href:"/issued"},{label:"Returned",href:"/returned"}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:item.href==="/cylinders"?"#E8820C":"transparent",color:"white"}}>{item.label}</button>))}
        {isAdmin&&(<><div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",padding:"8px 8px 6px"}}>Admin</div>{[{label:"Add Cylinder",href:"/cylinders/add"},{label:"Settings",href:"/settings"}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:"transparent",color:"white"}}>{item.label}</button>))}</>)}
        <div style={{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"4px 8px",marginBottom:"8px"}}><div style={{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:"#E8820C",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"700",fontSize:"13px"}}>{user.name[0]}</div><div><div style={{color:"white",fontSize:"13px",fontWeight:"600"}}>{user.name}</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>{isAdmin?"Administrator":"Normal User"}</div></div></div>
          <button onClick={()=>{localStorage.removeItem("cpcl_user");router.push("/login");}} style={{width:"100%",padding:"7px",backgroundColor:"transparent",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"6px",color:"rgba(255,255,255,0.6)",fontSize:"12px",cursor:"pointer"}}>Sign out</button>
        </div>
      </div>
      <div style={{marginLeft:"220px",flex:1,padding:"28px"}}>
        <div style={{backgroundColor:"white",padding:"16px 24px",borderRadius:"12px",marginBottom:"24px",border:"1px solid #E2E8F0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><h1 style={{fontSize:"20px",fontWeight:"700",color:"#0F2D54"}}>All Cylinders</h1><p style={{fontSize:"13px",color:"#475569",marginTop:"2px"}}>Total: {data.length} cylinders</p></div>
          <div style={{display:"flex",gap:"10px"}}>{isAdmin&&<a href="http://localhost:4000/api/export/excel" download="CPCL_Cylinders.xlsx" style={{backgroundColor:"#15803D",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"}}>Export Excel</a>}{isAdmin&&<button onClick={()=>router.push("/cylinders/add")} style={{backgroundColor:"#E8820C",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>+ Add Cylinder</button>}</div>
        </div>
        {loading&&<div style={{textAlign:"center",padding:"40px",fontSize:"16px",color:"#64748B"}}>Loading cylinders...</div>}
        {!loading&&<div style={{backgroundColor:"white",borderRadius:"12px",border:"1px solid #E2E8F0",overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:"1px solid #E2E8F0",display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"}}>
            <input placeholder="Search serial, gas, supplier..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:"200px",padding:"9px 14px",border:"1.5px solid #E2E8F0",borderRadius:"8px",fontSize:"13px",outline:"none",backgroundColor:"#F8FAFC",color:"#1E293B"}}/>
            <select value={catFilter} onChange={e=>setCat(e.target.value)} style={{padding:"9px 14px",border:"1.5px solid #E2E8F0",borderRadius:"8px",fontSize:"13px",outline:"none",backgroundColor:"white",color:"#1E293B",cursor:"pointer"}}><option value="">All Categories</option><option>Helium</option><option>Ammonia</option><option>Special</option><option>Calibration</option></select>
            <span style={{fontSize:"12px",color:"#475569"}}>{filtered.length} records</span>
          </div>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{backgroundColor:"#F8FAFC"}}>{["Serial No.","Gas","Category","Supplier","Receipt","Department","Custody","Rental","Status","Actions"].map(h=>(<th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:"11px",fontWeight:"700",color:"#334155",textTransform:"uppercase",letterSpacing:"0.06em",borderBottom:"1px solid #E2E8F0",whiteSpace:"nowrap"}}>{h}</th>))}</tr></thead>
            <tbody>{filtered.map((c,i)=>{
              const r=Math.max(0,c.days-c.free)*c.rent;
              return(<tr key={i} style={{borderBottom:"1px solid #F1F5F9"}}>
                <td style={{padding:"12px 14px"}}><code style={{fontSize:"12px",backgroundColor:"#F1F5F9",padding:"2px 6px",borderRadius:"4px",color:"#1E293B"}}>{c.serial}</code></td>
                <td style={{padding:"12px 14px",fontSize:"13px",color:"#1E293B",fontWeight:"500"}}>{c.gas}</td>
                <td style={{padding:"12px 14px"}}><span style={{backgroundColor:cb(c.cat),color:cc(c.cat),padding:"2px 8px",borderRadius:"20px",fontSize:"11px",fontWeight:"600"}}>{c.cat}</span></td>
                <td style={{padding:"12px 14px",fontSize:"12px",color:"#334155"}}>{c.supplier}</td>
                <td style={{padding:"12px 14px",fontSize:"12px",color:"#334155"}}>{c.receipt}</td>
                <td style={{padding:"12px 14px",fontSize:"12px",color:"#334155"}}>{c.dept||"—"}</td>
                <td style={{padding:"12px 14px"}}><span style={{fontWeight:"600",color:"#1E293B"}}>{c.days}</span><span style={{color:"#64748B",fontSize:"11px"}}> days</span><div style={{fontSize:"11px",color:"#64748B"}}>Free:{c.free}d</div></td>
                <td style={{padding:"12px 14px",fontWeight:"600",color:r>0?"#B91C1C":"#15803D"}}>Rs.{r.toLocaleString("en-IN")}</td>
                <td style={{padding:"12px 14px"}}><span style={{backgroundColor:sb(c.status),color:sc(c.status),padding:"3px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:"600"}}>{c.status}</span></td>
                <td style={{padding:"12px 14px"}}>
                  <div style={{display:"flex",gap:"6px"}}>
                    <button style={{padding:"5px 10px",fontSize:"12px",cursor:"pointer",border:"1px solid #E2E8F0",borderRadius:"6px",backgroundColor:"white",color:"#1E293B"}}>View</button>
                    {isAdmin&&<button onClick={()=>openEdit(c)} style={{padding:"5px 10px",fontSize:"12px",cursor:"pointer",border:"1px solid #0F2D54",borderRadius:"6px",backgroundColor:"white",color:"#0F2D54"}}>Edit</button>}
                    {isAdmin&&<button onClick={()=>deleteCylinder(c)} style={{padding:"5px 10px",fontSize:"12px",cursor:"pointer",border:"1px solid #B91C1C",borderRadius:"6px",backgroundColor:"white",color:"#B91C1C"}}>Delete</button>}
                  </div>
                </td>
              </tr>);
            })}</tbody>
          </table></div>
          <div style={{padding:"12px 20px",borderTop:"1px solid #E2E8F0",fontSize:"12px",color:"#475569"}}>Showing {filtered.length} of {data.length} cylinders</div>
        </div>}
      </div>
      {editItem&&(
        <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"20px"}}>
          <div style={{backgroundColor:"white",borderRadius:"16px",width:"100%",maxWidth:"600px",maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{padding:"20px 24px",borderBottom:"1px solid #E2E8F0",display:"flex",alignItems:"center",justifyContent:"space-between"}}><h3 style={{fontSize:"16px",fontWeight:"700",color:"#0F2D54"}}>Edit - {editForm&&editForm.serial}</h3><button onClick={()=>setEditItem(null)} style={{width:"30px",height:"30px",borderRadius:"6px",border:"none",backgroundColor:"#F1F5F9",cursor:"pointer",fontSize:"18px",color:"#475569"}}>x</button></div>
            <div style={{padding:"20px 24px",overflowY:"auto",flex:1}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
              {[{label:"Serial No.",field:"serial"},{label:"Gas Name",field:"gas"},{label:"Supplier",field:"supplier"},{label:"Department",field:"dept"},{label:"Custody Days",field:"days",type:"number"},{label:"Rental Free Days",field:"free",type:"number"},{label:"Rent Per Day",field:"rent",type:"number"}].map(f=>(<div key={f.field}><label style={{display:"block",fontSize:"11px",fontWeight:"700",color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px"}}>{f.label}</label><input type={f.type||"text"} value={editForm&&editForm[f.field]||""} onChange={e=>setEditForm(p=>({...p,[f.field]:f.type==="number"?Number(e.target.value):e.target.value}))} style={inp}/></div>))}
              <div><label style={{display:"block",fontSize:"11px",fontWeight:"700",color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px"}}>Status</label><select value={editForm&&editForm.status||""} onChange={e=>setEditForm(p=>({...p,status:e.target.value}))} style={inp}><option>Within Limit</option><option>Overdue</option><option>GM Escalated</option><option>DGM Escalated</option><option>Returned</option></select></div>
              <div><label style={{display:"block",fontSize:"11px",fontWeight:"700",color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px"}}>Category</label><select value={editForm&&editForm.cat||""} onChange={e=>setEditForm(p=>({...p,cat:e.target.value}))} style={inp}><option>Helium</option><option>Ammonia</option><option>Special</option><option>Calibration</option></select></div>
            </div></div>
            <div style={{padding:"14px 24px",borderTop:"1px solid #E2E8F0",display:"flex",justifyContent:"flex-end",gap:"10px"}}><button onClick={()=>setEditItem(null)} style={{padding:"9px 20px",border:"1px solid #E2E8F0",borderRadius:"8px",backgroundColor:"white",color:"#475569",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Cancel</button><button onClick={saveEdit} style={{padding:"9px 20px",border:"none",borderRadius:"8px",backgroundColor:"#0F2D54",color:"white",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Update Record</button></div>
          </div>
        </div>
      )}
    </div>
  );
}