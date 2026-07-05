'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const ESC = [
  { serial:'HE-2024-001', gas:'Helium Gas', supplier:'Linde India Ltd', dept:'R&D', person:'Dr. Rajan K', desig:'Senior Scientist', receipt:'05/10/2024', orderNo:'PO-2024-089', invoiceNo:'LIN-4521', invoiceDate:'04/10/2024', mrNo:'MR-1001', issued:'08/10/2024', prNo:'PR-2024-112', overdue:596, rental:26820, category:'Helium', rentFree:30, rentPerDay:45, remarks:'Priority cylinder for ongoing experiment' },
  { serial:'CAL-2024-009', gas:'Nitrogen Calibration', supplier:'Linde India Ltd', dept:'Maintenance-Inst', person:'Muthu R', desig:'Instrument Technician', receipt:'15/10/2024', orderNo:'PO-2024-102', invoiceNo:'LIN-4788', invoiceDate:'14/10/2024', mrNo:'MR-1045', issued:'18/10/2024', prNo:'PR-2024-134', overdue:571, rental:17130, category:'Calibration', rentFree:45, rentPerDay:30, remarks:'For analyser calibration' },
  { serial:'SP-2024-003', gas:'Argon Special Grade', supplier:'Praxair India', dept:'QC Lab', person:'Priya M', desig:'QC Analyst', receipt:'01/10/2024', orderNo:'PO-2024-081', invoiceNo:'PRX-2201', invoiceDate:'30/09/2024', mrNo:'MR-1002', issued:'03/10/2024', prNo:'PR-2024-115', overdue:600, rental:33000, category:'Special', rentFree:30, rentPerDay:55, remarks:'' },
  { serial:'HE-2024-007', gas:'Helium Gas', supplier:'BOC India', dept:'R&D', person:'Dr. Anand V', desig:'Research Engineer', receipt:'10/08/2024', orderNo:'PO-2024-060', invoiceNo:'BOC-7712', invoiceDate:'09/08/2024', mrNo:'MR-0901', issued:'15/08/2024', prNo:'PR-2024-088', overdue:652, rental:29340, category:'Helium', rentFree:30, rentPerDay:45, remarks:'Overdue escalated to DGM' },
];
export default function EscalationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sel, setSel] = useState(null);
  const [emailPopup, setEmailPopup] = useState(null);
  const [emailSent, setEmailSent] = useState([]);
  useEffect(() => { const s = localStorage.getItem('cpcl_user'); if (!s) { router.push('/login'); return; } setUser(JSON.parse(s)); }, [router]);
  if (!user) return null;
  const isAdmin = user.role === 'admin';
  function sendEmail(cyl) {
    const settings = JSON.parse(localStorage.getItem('cpcl_settings') || '{}');
    const emails = settings.emails || {};
    const gmEmail = emails.gm || 'gm@cpcl.co.in, dgm-stores@cpcl.co.in';
    const today = new Date().toLocaleDateString('en-IN');
    const emailData = {
      to: gmEmail,
      cc: emails.dgm || 'dgm-stores@cpcl.co.in',
      subject: 'URGENT: Gas Cylinder Overdue - ' + cyl.serial + ' - ' + cyl.gas,
      body: 'Dear GM/DGM,\n\nThis is an automated escalation email from the CPCL Cylinder Tracking Module.\n\nCylinder Details:\n- Serial No: ' + cyl.serial + '\n- Gas Type: ' + cyl.gas + '\n- Supplier: ' + cyl.supplier + '\n- Department: ' + cyl.dept + '\n- Person In Charge: ' + cyl.person + '\n- Receipt Date: ' + cyl.receipt + '\n- Overdue By: ' + cyl.overdue + ' days\n- Total Rental Due: Rs.' + cyl.rental.toLocaleString('en-IN') + '\n\nPlease take immediate action to return this cylinder to the vendor.\n\nRegards,\nCPCL Cylinder Tracking System\nDate: ' + today,
      sentAt: today,
      cyl: cyl.serial
    };
    setEmailPopup(emailData);
    setEmailSent(prev => [...prev, cyl.serial]);
  }
  const Row = ({ label, value }) => (<div><div style={{fontSize:'11px',color:'#94A3B8',fontWeight:'600',textTransform:'uppercase',marginBottom:'2px'}}>{label}</div><div style={{fontSize:'14px',color:'#1E293B',fontWeight:'500'}}>{value||'—'}</div></div>);
  const Sec = ({ title }) => (<div style={{fontSize:'11px',fontWeight:'700',color:'#0F2D54',textTransform:'uppercase',letterSpacing:'0.08em',paddingBottom:'8px',borderBottom:'2px solid #E8F0F9',marginBottom:'12px',marginTop:'16px'}}>{title}</div>);
  return (
    <div style={{display:'flex',minHeight:'100vh',backgroundColor:'#F1F5F9'}}>
      <div style={{width:'220px',backgroundColor:'#0F2D54',display:'flex',flexDirection:'column',padding:'20px 12px',position:'fixed',height:'100vh',top:0,left:0}}>
        <div style={{padding:'8px',marginBottom:'16px'}}><div style={{color:'white',fontWeight:'800',fontSize:'16px'}}>CPCL <span style={{color:'#E8820C'}}>CTM</span></div><div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>Cylinder Tracking Module</div></div>
        <div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',padding:'0 8px',marginBottom:'6px'}}>Main</div>
        {[{label:'Dashboard',href:'/dashboard'},{label:'All Cylinders',href:'/cylinders'},{label:'Escalations',href:'/escalations'},{label:'Issued',href:'/issued'},{label:'Returned',href:'/returned'}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'6px',fontSize:'13px',cursor:'pointer',border:'none',marginBottom:'2px',width:'100%',textAlign:'left',backgroundColor:item.href==='/escalations'?'#E8820C':'transparent',color:'white'}}>{item.label}</button>))}
        {isAdmin&&(<><div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',padding:'8px 8px 6px'}}>Admin</div>{[{label:'Add Cylinder',href:'/cylinders/add'},{label:'Settings',href:'/settings'}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'6px',fontSize:'13px',cursor:'pointer',border:'none',marginBottom:'2px',width:'100%',textAlign:'left',backgroundColor:'transparent',color:'white'}}>{item.label}</button>))}</>)}
        <div style={{marginTop:'auto',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'4px 8px',marginBottom:'8px'}}><div style={{width:'32px',height:'32px',borderRadius:'50%',backgroundColor:'#E8820C',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'13px'}}>{user.name[0]}</div><div><div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{user.name}</div><div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{isAdmin?'Administrator':'Normal User'}</div></div></div>
          <button onClick={()=>{localStorage.removeItem('cpcl_user');router.push('/login');}} style={{width:'100%',padding:'7px',backgroundColor:'transparent',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',color:'rgba(255,255,255,0.6)',fontSize:'12px',cursor:'pointer'}}>Sign out</button>
        </div>
      </div>
      <div style={{marginLeft:'220px',flex:1,padding:'28px'}}>
        <div style={{backgroundColor:'white',padding:'16px 24px',borderRadius:'12px',marginBottom:'24px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div><h1 style={{fontSize:'20px',fontWeight:'700',color:'#0F2D54'}}>Escalations</h1><p style={{fontSize:'13px',color:'#475569',marginTop:'2px'}}>Cylinders requiring action</p></div>
          {isAdmin&&<button onClick={()=>router.push('/cylinders/add')} style={{backgroundColor:'#E8820C',color:'white',border:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>+ Add Cylinder</button>}
        </div>
        <div style={{backgroundColor:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'14px 18px',marginBottom:'24px',display:'flex',gap:'12px',alignItems:'center'}}>
          <span style={{fontSize:'18px'}}>🔔</span>
          <span style={{color:'#92400E',fontSize:'13px',fontWeight:'500'}}><strong>4 cylinder(s)</strong> require attention. Automated emails on <strong>1st</strong> (reminder), <strong>10th</strong> (DGM), <strong>20th</strong> (GM) of each month.</span>
          {isAdmin&&<button onClick={()=>{ ESC.forEach(c=>sendEmail(c)); alert('Escalation emails sent to all vendors!'); }} style={{marginLeft:'auto',backgroundColor:'#B45309',color:'white',border:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Send All Emails</button>}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
          <span style={{fontSize:'18px'}}>🔴</span>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#B91C1C'}}>GM Escalation – Immediate Action Required</h2>
          <span style={{backgroundColor:'#B91C1C',color:'white',padding:'2px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{ESC.length}</span>
        </div>
        <div style={{backgroundColor:'white',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
          <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{backgroundColor:'#F8FAFC'}}>{['Serial No.','Gas','Department','Receipt Date','Overdue By','Rental','Status','Actions'].map(h=>(<th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#334155',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0',whiteSpace:'nowrap'}}>{h}</th>))}</tr></thead>
            <tbody>{ESC.map(c=>(<tr key={c.serial} style={{borderBottom:'1px solid #F1F5F9'}}>
              <td style={{padding:'12px 14px'}}><code style={{fontSize:'12px',backgroundColor:'#F1F5F9',padding:'2px 6px',borderRadius:'4px',color:'#1E293B'}}>{c.serial}</code></td>
              <td style={{padding:'12px 14px'}}><div style={{fontSize:'13px',color:'#1E293B',fontWeight:'500'}}>{c.gas}</div><div style={{fontSize:'11px',color:'#64748B'}}>{c.supplier}</div></td>
              <td style={{padding:'12px 14px'}}><div style={{fontSize:'13px',color:'#1E293B'}}>{c.dept}</div><div style={{fontSize:'11px',color:'#64748B'}}>{c.person}</div></td>
              <td style={{padding:'12px 14px',fontSize:'12px',color:'#334155'}}>{c.receipt}</td>
              <td style={{padding:'12px 14px',fontWeight:'700',color:'#B91C1C',fontSize:'13px'}}>{c.overdue} days</td>
              <td style={{padding:'12px 14px',fontWeight:'600',color:'#1E293B'}}>Rs.{c.rental.toLocaleString('en-IN')}</td>
              <td style={{padding:'12px 14px'}}><span style={{backgroundColor:'#FEE2E2',color:'#B91C1C',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>GM Escalated</span></td>
              <td style={{padding:'12px 14px'}}>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  <button onClick={()=>setSel(c)} style={{padding:'5px 10px',fontSize:'12px',cursor:'pointer',border:'1px solid #E2E8F0',borderRadius:'6px',backgroundColor:'white',color:'#1E293B'}}>View</button>
                  
                  {isAdmin&&<button onClick={()=>sendEmail(c)} style={{padding:'5px 10px',fontSize:'12px',cursor:'pointer',border:'none',borderRadius:'6px',backgroundColor:emailSent.includes(c.serial)?'#15803D':'#B91C1C',color:'white'}}>{emailSent.includes(c.serial)?'Sent':'Send Email'}</button>}
                </div>
              </td>
            </tr>))}</tbody>
          </table></div>
        </div>
      </div>
      {sel&&(
        <div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{backgroundColor:'white',borderRadius:'16px',width:'100%',maxWidth:'680px',maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}><h3 style={{fontSize:'16px',fontWeight:'700',color:'#0F2D54'}}>{sel.serial} — {sel.gas}</h3><button onClick={()=>setSel(null)} style={{width:'30px',height:'30px',borderRadius:'6px',border:'none',backgroundColor:'#F1F5F9',cursor:'pointer',fontSize:'18px',color:'#475569'}}>x</button></div>
            <div style={{padding:'20px 24px',overflowY:'auto',flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
                <span style={{backgroundColor:'#E4F5F1',color:'#0B6E5E',padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>{sel.category}</span>
                <span style={{backgroundColor:'#FEE2E2',color:'#B91C1C',padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>GM Escalated</span>
                <span style={{marginLeft:'auto',fontSize:'13px',color:'#475569'}}>Custody: <strong>{sel.overdue+sel.rentFree} days</strong> | Rental: <strong style={{color:'#B91C1C'}}>Rs.{sel.rental.toLocaleString('en-IN')}</strong></span>
              </div>
              <div style={{backgroundColor:'#FEF3C7',borderRadius:'10px',padding:'14px 20px',marginBottom:'16px'}}>
                <div style={{fontSize:'11px',fontWeight:'700',color:'#92400E',marginBottom:'12px',textTransform:'uppercase'}}>Escalation Status</div>
                <div style={{display:'flex',alignItems:'center'}}>
                  {[{label:'1st Reminder',done:true,color:'#15803D'},{label:'10th DGM',done:true,color:'#15803D'},{label:'20th GM',done:true,color:'#B91C1C'},{label:'Resolved',done:false,color:'#E2E8F0'}].map((step,i)=>(<div key={i} style={{display:'flex',alignItems:'center',flex:1}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}><div style={{width:'28px',height:'28px',borderRadius:'50%',backgroundColor:step.done?step.color:'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',color:'white',fontWeight:'700'}}>{step.done?(i===2?'!':'✓'):'.'}</div><div style={{fontSize:'10px',color:'#475569',marginTop:'4px',textAlign:'center'}}>{step.label}</div></div>{i<3&&<div style={{height:'2px',flex:1,backgroundColor:i<2?'#15803D':'#E2E8F0',marginBottom:'14px'}}/>}</div>))}
                </div>
              </div>
              <Sec title='Cylinder Information'/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'8px'}}>
                <Row label='Supplier' value={sel.supplier}/><Row label='Gas Name' value={sel.gas}/>
                <Row label='Serial No.' value={sel.serial}/><Row label='Category' value={sel.category}/>
                <Row label='Receipt Date' value={sel.receipt}/><Row label='Rental-Free Days' value={sel.rentFree+' days'}/>
                <Row label='Rent / Day' value={'Rs.'+sel.rentPerDay}/><Row label='Anticipated Return' value='25 days'/>
              </div>
              <Sec title='Purchase Details'/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'8px'}}>
                <Row label='Order No.' value={sel.orderNo}/><Row label='Invoice No.' value={sel.invoiceNo}/>
                <Row label='Invoice Date' value={sel.invoiceDate}/><Row label='MR No.' value={sel.mrNo}/>
              </div>
              <Sec title='Issuance Details'/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'8px'}}>
                <Row label='Issued Date' value={sel.issued}/><Row label='Department' value={sel.dept}/>
                <Row label='PR No.' value={sel.prNo}/><Row label='Recipient' value={sel.person}/>
                <Row label='Designation' value={sel.desig}/>
              </div>
              <Sec title='Return Details'/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'8px'}}>
                <Row label='Return from User' value='—'/><Row label='Vendor Intimation' value='—'/>
                <Row label='Return to Vendor' value='—'/><Row label='Gate Pass No.' value='—'/>
              </div>
              {sel.remarks&&(<><Sec title='Remarks'/><p style={{fontSize:'14px',color:'#1E293B'}}>{sel.remarks}</p></>)}
            </div>
            <div style={{padding:'14px 24px',borderTop:'1px solid #E2E8F0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              {isAdmin&&<button onClick={()=>{sendEmail(sel);setSel(null);}} style={{padding:'9px 20px',border:'none',borderRadius:'8px',backgroundColor:'#B91C1C',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Send Escalation Email</button>}
              <div style={{display:'flex',gap:'10px',marginLeft:'auto'}}>
                <button onClick={()=>setSel(null)} style={{padding:'9px 20px',border:'1px solid #E2E8F0',borderRadius:'8px',backgroundColor:'white',color:'#475569',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Close</button>
                
              </div>
            </div>
          </div>
        </div>
      )}
      {emailPopup&&(
        <div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:'20px'}}>
          <div style={{backgroundColor:'white',borderRadius:'16px',width:'100%',maxWidth:'580px',boxShadow:'0 20px 60px rgba(0,0,0,0.4)'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'40px',height:'40px',backgroundColor:'#DCFCE7',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>✉</div>
              <div><h3 style={{fontSize:'16px',fontWeight:'700',color:'#15803D',margin:0}}>Email Sent Successfully!</h3><p style={{fontSize:'12px',color:'#64748B',margin:0}}>Escalation email dispatched</p></div>
            </div>
            <div style={{padding:'20px 24px'}}>
              <div style={{backgroundColor:'#F8FAFC',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
                <div style={{marginBottom:'8px'}}><span style={{fontSize:'11px',fontWeight:'700',color:'#64748B',textTransform:'uppercase'}}>To: </span><span style={{fontSize:'13px',color:'#1E293B'}}>{emailPopup.to}</span></div>
                <div style={{marginBottom:'8px'}}><span style={{fontSize:'11px',fontWeight:'700',color:'#64748B',textTransform:'uppercase'}}>CC: </span><span style={{fontSize:'13px',color:'#1E293B'}}>{emailPopup.cc}</span></div>
                <div style={{marginBottom:'8px'}}><span style={{fontSize:'11px',fontWeight:'700',color:'#64748B',textTransform:'uppercase'}}>Subject: </span><span style={{fontSize:'13px',color:'#1E293B',fontWeight:'600'}}>{emailPopup.subject}</span></div>
                <div><span style={{fontSize:'11px',fontWeight:'700',color:'#64748B',textTransform:'uppercase'}}>Date: </span><span style={{fontSize:'13px',color:'#1E293B'}}>{emailPopup.sentAt}</span></div>
              </div>
              <div style={{backgroundColor:'#F8FAFC',borderRadius:'10px',padding:'16px',whiteSpace:'pre-line',fontSize:'13px',color:'#334155',lineHeight:'1.6',maxHeight:'200px',overflowY:'auto'}}>{emailPopup.body}</div>
            </div>
            <div style={{padding:'14px 24px',borderTop:'1px solid #E2E8F0',display:'flex',justifyContent:'flex-end'}}>
              <button onClick={()=>setEmailPopup(null)} style={{padding:'10px 24px',border:'none',borderRadius:'8px',backgroundColor:'#0F2D54',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}