'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null as any);
  useEffect(() => { const s = localStorage.getItem('cpcl_user'); if (!s) { router.push('/login'); return; } setUser(JSON.parse(s)); }, [router]);
  if (!user) return null;
  const isAdmin = user?.role === 'admin';
  return (
    <div style={{display:'flex',minHeight:'100vh',backgroundColor:'#F1F5F9'}}>
      <div style={{width:'220px',backgroundColor:'#0F2D54',display:'flex',flexDirection:'column',padding:'20px 12px',position:'fixed',height:'100vh',top:0,left:0}}>
        <div style={{padding:'8px',marginBottom:'16px'}}><div style={{color:'white',fontWeight:'800',fontSize:'16px'}}>CPCL <span style={{color:'#E8820C'}}>CTM</span></div><div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>Cylinder Tracking Module</div></div>
        <div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',padding:'0 8px',marginBottom:'6px'}}>Main</div>
        {[{icon:'📊',label:'Dashboard',href:'/dashboard'},{icon:'🧪',label:'All Cylinders',href:'/cylinders'},{icon:'🔔',label:'Escalations',href:'/escalations'},{icon:'📤',label:'Issued',href:'/issued'},{icon:'↩',label:'Returned',href:'/returned'}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'6px',fontSize:'13px',cursor:'pointer',border:'none',marginBottom:'2px',width:'100%',textAlign:'left',backgroundColor:item.href==='/dashboard'?'#E8820C':'transparent',color:'white'}}><span>{item.icon}</span><span>{item.label}</span></button>))}
        {isAdmin&&(<><div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',padding:'8px 8px 6px'}}>Admin</div>{[{icon:'➕',label:'Add Cylinder',href:'/cylinders/add'},{icon:'⚙',label:'Settings',href:'/settings'}].map(item=>(<button key={item.href} onClick={()=>router.push(item.href)} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'6px',fontSize:'13px',cursor:'pointer',border:'none',marginBottom:'2px',width:'100%',textAlign:'left',backgroundColor:'transparent',color:'white'}}><span>{item.icon}</span><span>{item.label}</span></button>))}</>)}
        <div style={{marginTop:'auto',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'4px 8px',marginBottom:'8px'}}><div style={{width:'32px',height:'32px',borderRadius:'50%',backgroundColor:'#E8820C',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'13px'}}>{user?.name?.[0]}</div><div><div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{user?.name}</div><div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{isAdmin?'Administrator':'Normal User'}</div></div></div>
          <button onClick={()=>{localStorage.removeItem('cpcl_user');router.push('/login');}} style={{width:'100%',padding:'7px',backgroundColor:'transparent',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',color:'rgba(255,255,255,0.6)',fontSize:'12px',cursor:'pointer'}}>Sign out</button>
        </div>
      </div>
      <div style={{marginLeft:'220px',flex:1,padding:'28px'}}>
        <div style={{backgroundColor:'white',padding:'16px 24px',borderRadius:'12px',marginBottom:'24px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div><h1 style={{fontSize:'20px',fontWeight:'700',color:'#0F2D54'}}>Dashboard</h1><p style={{fontSize:'13px',color:'#475569',marginTop:'2px'}}>Welcome {user?.name}! Overview of all cylinders</p></div>
          {isAdmin&&<button onClick={()=>router.push('/cylinders/add')} style={{backgroundColor:'#E8820C',color:'white',border:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>+ Add Cylinder</button>}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>
          {[{icon:'🧪',label:'Total Cylinders',value:'5',bg:'#EFF6FF',sub:'4 active, 1 returned'},{icon:'⚠',label:'Overdue',value:'2',bg:'#FFFBEB',sub:'Beyond rental-free period'},{icon:'🔔',label:'Escalated',value:'1',bg:'#FEF2F2',sub:'DGM / GM level'},{icon:'₹',label:'Total Rental',value:'₹8,100',bg:'#F0FDF4',sub:'Across all cylinders'}].map(card=>(<div key={card.label} style={{backgroundColor:'white',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',display:'flex',alignItems:'flex-start',gap:'14px'}}><div style={{width:'44px',height:'44px',backgroundColor:card.bg,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{card.icon}</div><div><div style={{fontSize:'12px',color:'#475569',fontWeight:'600'}}>{card.label}</div><div style={{fontSize:'26px',fontWeight:'800',color:'#0F2D54',lineHeight:'1.1',marginTop:'2px'}}>{card.value}</div><div style={{fontSize:'11px',color:'#64748B',marginTop:'2px'}}>{card.sub}</div></div></div>))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'24px'}}>
          <div style={{backgroundColor:'white',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}><h3 style={{fontSize:'14px',fontWeight:'700',color:'#0F2D54'}}>Category Breakdown</h3></div>
            <div style={{padding:'16px'}}>{[{cat:'Helium',active:2,total:2,bg:'#E4F5F1',color:'#0B6E5E'},{cat:'Ammonia',active:0,total:1,bg:'#FEE2E2',color:'#B91C1C'},{cat:'Special',active:1,total:1,bg:'#E8F0F9',color:'#0F2D54'},{cat:'Calibration',active:1,total:1,bg:'#F1F5F9',color:'#475569'}].map(c=>(<div key={c.cat} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #F1F5F9'}}><span style={{backgroundColor:c.bg,color:c.color,padding:'2px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>{c.cat}</span><span style={{fontSize:'13px',color:'#1E293B',fontWeight:'500'}}>{c.active} active / {c.total} total</span></div>))}</div>
          </div>
          <div style={{backgroundColor:'white',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}><h3 style={{fontSize:'14px',fontWeight:'700',color:'#0F2D54'}}>Department Custody</h3></div>
            <div style={{padding:'16px'}}>{[{dept:'R&D',n:2},{dept:'QC Lab',n:1},{dept:'Maint-Inst',n:1}].map(d=>(<div key={d.dept} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #F1F5F9'}}><span style={{fontSize:'13px',color:'#1E293B',fontWeight:'500'}}>{d.dept}</span><span style={{fontSize:'16px',fontWeight:'800',color:'#0F2D54'}}>{d.n}</span></div>))}</div>
          </div>
        </div>
        <div style={{backgroundColor:'white',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}><h3 style={{fontSize:'14px',fontWeight:'700',color:'#0F2D54'}}>Recent Cylinders</h3></div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{backgroundColor:'#F8FAFC'}}>{['Serial No.','Gas','Department','Custody Days','Status'].map(h=>(<th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#334155',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0'}}>{h}</th>))}</tr></thead>
            <tbody>{[{serial:'HE-2024-001',gas:'Helium Gas',dept:'R&D',days:79,sc:'#B45309',sb:'#FEF3C7',status:'Overdue'},{serial:'AM-2024-005',gas:'Ammonia Anhydrous',dept:'MFG-CDU',days:45,sc:'#0F2D54',sb:'#E8F0F9',status:'Returned'},{serial:'CAL-2024-009',gas:'Nitrogen Calibration',dept:'Maint-Inst',days:69,sc:'#15803D',sb:'#DCFCE7',status:'Within Limit'},{serial:'SP-2024-003',gas:'Argon Special Grade',dept:'QC Lab',days:83,sc:'#B91C1C',sb:'#FEE2E2',status:'GM Escalated'},{serial:'HE-2024-007',gas:'Helium Gas',dept:'R&D',days:135,sc:'#B91C1C',sb:'#FEE2E2',status:'GM Escalated'}].map(row=>(<tr key={row.serial} style={{borderBottom:'1px solid #F1F5F9'}}><td style={{padding:'12px 16px'}}><code style={{fontSize:'12px',backgroundColor:'#F1F5F9',padding:'2px 6px',borderRadius:'4px',color:'#1E293B'}}>{row.serial}</code></td><td style={{padding:'12px 16px',fontSize:'13px',color:'#1E293B',fontWeight:'500'}}>{row.gas}</td><td style={{padding:'12px 16px',fontSize:'13px',color:'#334155'}}>{row.dept}</td><td style={{padding:'12px 16px',fontSize:'13px',color:'#1E293B'}}><strong>{row.days}</strong> <span style={{color:'#64748B',fontSize:'11px'}}>days</span></td><td style={{padding:'12px 16px'}}><span style={{backgroundColor:row.sb,color:row.sc,padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>{row.status}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}