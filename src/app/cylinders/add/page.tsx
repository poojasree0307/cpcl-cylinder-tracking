"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DEPTS = ["Stores","R&D","QC Lab","Maintenance-Inst","Maintenance-Elect","MFG-CDU","MFG-FCCU","MFG-Wax"];
const CATS = ["Helium","Ammonia","Special","Calibration"];
const inp:any = {width:"100%",padding:"10px 14px",border:"1.5px solid #E2E8F0",borderRadius:"8px",fontSize:"14px",outline:"none",color:"#1E293B",backgroundColor:"white"};
const lbl:any = {display:"block",fontSize:"11px",fontWeight:"700",color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px"};
const sec:any = {fontSize:"12px",fontWeight:"700",color:"#0F2D54",textTransform:"uppercase",letterSpacing:"0.1em",paddingBottom:"10px",borderBottom:"2px solid #E8F0F9",marginBottom:"16px",marginTop:"8px"};
const NAV = [{icon:"📊",label:"Dashboard",href:"/dashboard"},{icon:"🧪",label:"All Cylinders",href:"/cylinders"},{icon:"🔔",label:"Escalations",href:"/escalations"},{icon:"📤",label:"Issued",href:"/issued"},{icon:"↩",label:"Returned",href:"/returned"}];
export default function AddCylinderPage() {
  const router = useRouter();
  const [form, setForm] = useState({supplierName:"",gasName:"",serialNo:"",category:"",receiptDate:"",rentPerDay:"45",rentalFreedays:"30",anticipatedDays:"25",orderNo:"",invoiceNo:"",invoiceDate:"",mrNo:"",issuedDate:"",department:"",prNo:"",recipientName:"",designation:"",returnFromUserDate:"",intimationDate:"",returnToVendorDate:"",gatePassNo:"",remarks:""});
  const set = (f:string,v:string) => setForm(p=>({...p,[f]:v}));
  const save = async () => {
    if(!form.serialNo){alert("Serial number required!");return;}
    if(!form.receiptDate){alert("Receipt date required!");return;}
    try {
    const res = await fetch("http://localhost:4000/api/cylinders", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({serial:form.serialNo,gas:form.gasName,cat:form.category||"Helium",supplier:form.supplierName,receipt:form.receiptDate,dept:form.department,days:Math.max(0,Math.floor((new Date().getTime()-new Date(form.receiptDate).getTime())/86400000)),free:Number(form.rentalFreedays)||30,rent:Number(form.rentPerDay)||0,status:"Within Limit",orderNo:form.orderNo,invoiceNo:form.invoiceNo,mrNo:form.mrNo,person:form.recipientName,desig:form.designation,remarks:form.remarks})});
    if (res.ok) { alert("Cylinder saved successfully!"); window.location.href="/cylinders"; return; }
  } catch(e) { console.log("Backend not available, using localStorage"); }
  const all = JSON.parse(localStorage.getItem("cpcl_cylinders")||"[]");
    const days = Math.max(0,Math.floor((new Date().getTime()-new Date(form.receiptDate).getTime())/86400000));
    const newCyl = {
      id: Date.now(),
      serial: form.serialNo,
      gas: form.gasName,
      cat: form.category || "Helium",
      supplier: form.supplierName,
      receipt: form.receiptDate,
      dept: form.department,
      days: days,
      free: Number(form.rentalFreedays)||30,
      rent: Number(form.rentPerDay)||0,
      status: "Within Limit",
      orderNo: form.orderNo,
      invoiceNo: form.invoiceNo,
      mrNo: form.mrNo,
      person: form.recipientName,
      desig: form.designation,
      remarks: form.remarks
    };
    localStorage.setItem("cpcl_cylinders",JSON.stringify([...all,newCyl]));
    alert("Cylinder saved successfully!");
    router.push("/cylinders");
  };
  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#F1F5F9"}}>
      <div style={{width:"220px",backgroundColor:"#0F2D54",display:"flex",flexDirection:"column",padding:"20px 12px",position:"fixed",height:"100vh",top:0,left:0}}>
        <div style={{padding:"8px",marginBottom:"24px"}}><div style={{color:"white",fontWeight:"800",fontSize:"16px"}}>CPCL <span style={{color:"#E8820C"}}>CTM</span></div><div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px"}}>Cylinder Tracking Module</div></div>
        {NAV.map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"6px",fontSize:"13px",cursor:"pointer",border:"none",marginBottom:"2px",width:"100%",textAlign:"left",backgroundColor:"transparent",color:"white"}}><span>{item.icon}</span><span>{item.label}</span></button>))}
        <div style={{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"12px"}}><button onClick={()=>{localStorage.removeItem("cpcl_user");router.push("/login");}} style={{width:"100%",padding:"7px",backgroundColor:"transparent",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"6px",color:"rgba(255,255,255,0.6)",fontSize:"12px",cursor:"pointer"}}>Sign out</button></div>
      </div>
      <div style={{marginLeft:"220px",flex:1,padding:"28px"}}>
        <div style={{backgroundColor:"white",padding:"16px 24px",borderRadius:"12px",marginBottom:"24px",border:"1px solid #E2E8F0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><h1 style={{fontSize:"20px",fontWeight:"700",color:"#0F2D54"}}>Add Cylinder</h1><p style={{fontSize:"13px",color:"#475569",marginTop:"2px"}}>Register a new cylinder</p></div>
          <button onClick={()=>router.push("/cylinders")} style={{padding:"8px 16px",border:"1px solid #E2E8F0",borderRadius:"8px",backgroundColor:"white",color:"#475569",fontSize:"13px",cursor:"pointer"}}>← Back</button>
        </div>
        <div style={{backgroundColor:"white",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"28px"}}>
          <div style={sec}>Cylinder Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
            <div><label style={lbl}>Supplier Name</label><input style={inp} placeholder="e.g. Linde India Ltd" value={form.supplierName} onChange={e=>set("supplierName",e.target.value)}/></div>
            <div><label style={lbl}>Gas Name</label><input style={inp} placeholder="e.g. Helium Gas" value={form.gasName} onChange={e=>set("gasName",e.target.value)}/></div>
            <div><label style={lbl}>Serial Number *</label><input style={inp} placeholder="e.g. HE-2024-001" value={form.serialNo} onChange={e=>set("serialNo",e.target.value)}/></div>
            <div><label style={lbl}>Category</label><select style={inp} value={form.category} onChange={e=>set("category",e.target.value)}><option value="">Select...</option>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
            <div><label style={lbl}>Receipt Date *</label><input style={inp} type="date" value={form.receiptDate} onChange={e=>set("receiptDate",e.target.value)}/></div>
            <div><label style={lbl}>Rent Per Day (₹)</label><input style={inp} type="number" value={form.rentPerDay} onChange={e=>set("rentPerDay",e.target.value)}/></div>
            <div><label style={lbl}>Rental-Free Days</label><input style={inp} type="number" value={form.rentalFreedays} onChange={e=>set("rentalFreedays",e.target.value)}/></div>
            <div><label style={lbl}>Anticipated Return Days</label><input style={inp} type="number" value={form.anticipatedDays} onChange={e=>set("anticipatedDays",e.target.value)}/></div>
          </div>
          <div style={sec}>Purchase Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
            <div><label style={lbl}>Order Number</label><input style={inp} placeholder="PO-2024-001" value={form.orderNo} onChange={e=>set("orderNo",e.target.value)}/></div>
            <div><label style={lbl}>Invoice Number</label><input style={inp} placeholder="INV-0001" value={form.invoiceNo} onChange={e=>set("invoiceNo",e.target.value)}/></div>
            <div><label style={lbl}>Invoice Date</label><input style={inp} type="date" value={form.invoiceDate} onChange={e=>set("invoiceDate",e.target.value)}/></div>
            <div><label style={lbl}>MR Number</label><input style={inp} placeholder="MR-0001" value={form.mrNo} onChange={e=>set("mrNo",e.target.value)}/></div>
          </div>
          <div style={sec}>Issuance Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
            <div><label style={lbl}>Issued Date</label><input style={inp} type="date" value={form.issuedDate} onChange={e=>set("issuedDate",e.target.value)}/></div>
            <div><label style={lbl}>Department</label><select style={inp} value={form.department} onChange={e=>set("department",e.target.value)}><option value="">Select...</option>{DEPTS.map(d=><option key={d}>{d}</option>)}</select></div>
            <div><label style={lbl}>PR Number</label><input style={inp} placeholder="PR-2024-001" value={form.prNo} onChange={e=>set("prNo",e.target.value)}/></div>
            <div><label style={lbl}>Recipient Name</label><input style={inp} placeholder="Full name" value={form.recipientName} onChange={e=>set("recipientName",e.target.value)}/></div>
            <div><label style={lbl}>Designation</label><input style={inp} placeholder="e.g. Senior Scientist" value={form.designation} onChange={e=>set("designation",e.target.value)}/></div>
          </div>
          <div style={sec}>Return Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
            <div><label style={lbl}>Return from User – Date</label><input style={inp} type="date" value={form.returnFromUserDate} onChange={e=>set("returnFromUserDate",e.target.value)}/></div>
            <div><label style={lbl}>Intimation to Vendor – Date</label><input style={inp} type="date" value={form.intimationDate} onChange={e=>set("intimationDate",e.target.value)}/></div>
            <div><label style={lbl}>Return to Vendor – Date</label><input style={inp} type="date" value={form.returnToVendorDate} onChange={e=>set("returnToVendorDate",e.target.value)}/></div>
            <div><label style={lbl}>Gate Pass No.</label><input style={inp} placeholder="GP-2024-001" value={form.gatePassNo} onChange={e=>set("gatePassNo",e.target.value)}/></div>
          </div>
          <div style={sec}>Remarks</div>
          <textarea style={{...inp,minHeight:"100px",resize:"vertical"}} placeholder="Any additional notes..." value={form.remarks} onChange={e=>set("remarks",e.target.value)}/>
          <div style={{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"28px",paddingTop:"20px",borderTop:"1px solid #E2E8F0"}}>
            <button onClick={()=>router.push("/cylinders")} style={{padding:"10px 24px",border:"1.5px solid #E2E8F0",borderRadius:"8px",backgroundColor:"white",color:"#475569",fontSize:"14px",fontWeight:"600",cursor:"pointer"}}>Cancel</button>
            <button onClick={save} style={{padding:"10px 28px",border:"none",borderRadius:"8px",backgroundColor:"#0F2D54",color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer"}}>Save Record</button>
          </div>
        </div>
      </div>
    </div>
  );
}