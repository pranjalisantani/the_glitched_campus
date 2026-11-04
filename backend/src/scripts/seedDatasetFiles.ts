import fs from 'fs';
import path from 'path';

export const DATASET_CONTENTS: Record<string, string> = {
  '01_Campus_Placement_RAW_UNCLEAN.csv': `student_id,branch,cgpa,internships,coding_score,aptitude_score,projects_count,placement_status,salary_package_lpa,company_name,remarks
STU-001,Computer Science,8.9,2,88,85,4,Placed,14.5,Nexus Cyber Dynamics,Verified by placement cell
STU-002,Information Tech,7.4,1,72,68,2,Placed,8.2,FinTech Global,
STU-003,Electronics,6.8,0,55,60,1,Not Placed,0,,Pending remedial aptitude training
STU-004,Computer Science,9.2,3,95,92,5,Placed,22.0,CloudScale Systems,Gold medalist candidate
STU-005,Mechanical,7.1,1,60,70,2,Placed,6.5,Apex Robotics,
STU-006,Civil,6.2,0,45,52,1,Not Placed,0,,Needs resume overhaul
STU-007,Computer Science,8.5,2,82,78,3,Placed,12.0,DataStream Analytics,
STU-008,Information Tech,7.9,1,76,80,3,Placed,9.5,InfoCore Tech,
STU-009,Electronics,7.0,1,64,66,2,Not Placed,0,,Interview round 2 pending
STU-010,Computer Science,8.1,2,79,84,3,Placed,11.2,CyberShield Defense,
STU-011,Civil,7.5,1,58,62,2,Placed,5.8,BuildTech Infra,
STU-012,Mechanical,8.0,2,70,75,3,Placed,7.5,Volt Motors,
STU-013,Computer Science,6.5,0,52,58,1,Not Placed,0,,Backlog cleared recently
STU-014,Information Tech,8.7,2,86,88,4,Placed,15.0,Quantum Intelligence,
STU-015,Electronics,8.3,2,80,82,3,Placed,10.0,SemiCon Core,
`,

  '02_Student_Attendance_RAW_UNCLEAN.csv': `record_id,student_id,student_name,branch,semester,subject_code,subject_name,classes_held,classes_attended,attendance_percentage,status_flag,recorded_date
ATT-101,STU-001,Aarav Sharma,Computer Science,6,CS601,Network Security,45,42,93.33,REGULAR,2026-10-15
ATT-102,STU-002,Aditi Rao,Information Tech,6,IT602,Data Forensics,45,34,75.56,BORDERLINE,2026-10-15
ATT-103,STU-003,Rohan Verma,Electronics,6,EC603,Embedded Systems,40,22,55.00,SHORTAGE,2026-10-15
ATT-104,STU-004,Priya Nair,Computer Science,6,CS601,Network Security,45,45,100.0,EXEMPLARY,2026-10-15
ATT-105,STU-005,Vikram Singh,Mechanical,6,ME604,Thermodynamics,42,30,71.43,BORDERLINE,2026-10-15
ATT-106,STU-006,Kavita Iyer,Civil,6,CE605,Structural Design,38,18,47.37,CRITICAL_SHORTAGE,2026-10-15
ATT-107,STU-007,Siddharth Das,Computer Science,6,CS601,Network Security,45,39,86.67,REGULAR,2026-10-15
ATT-108,STU-008,Ananya Gupta,Information Tech,6,IT602,Data Forensics,45,41,91.11,REGULAR,2026-10-15
ATT-109,STU-009,Karan Malhotra,Electronics,6,EC603,Embedded Systems,40,28,70.00,SHORTAGE,2026-10-15
ATT-110,STU-010,Meera Joshi,Computer Science,6,CS601,Network Security,45,43,95.56,REGULAR,2026-10-15
`,

  '03_Library_Usage_RAW_UNCLEAN.csv': `transaction_id,student_id,book_title,isbn,category,borrow_date,due_date,return_date,overdue_days,fine_amount_inr,status
LIB-501,STU-001,Applied Cryptography 2nd Ed,978-0471117094,Cybersecurity,2026-09-01,2026-09-15,2026-09-14,0,0,RETURNED_ON_TIME
LIB-502,STU-003,Digital Signal Processing,978-0131873742,Electronics,2026-09-05,2026-09-19,2026-09-28,9,90,OVERDUE_PAID
LIB-503,STU-004,TCP/IP Illustrated Vol 1,978-0201633467,Networking,2026-09-10,2026-09-24,2026-09-22,0,0,RETURNED_ON_TIME
LIB-504,STU-006,Fluid Mechanics Fundamentals,978-0073380322,Engineering,2026-09-12,2026-09-26,,15,150,CURRENTLY_OVERDUE
LIB-505,STU-007,Machine Learning: A Probabilistic Perspective,978-0262018029,AI,2026-09-15,2026-09-29,2026-09-29,0,0,RETURNED_ON_TIME
LIB-506,STU-002,Database System Concepts 7th Ed,978-0078022159,Databases,2026-09-18,2026-10-02,2026-10-05,3,30,OVERDUE_PAID
LIB-507,STU-008,Modern Operating Systems 4th Ed,978-0133591620,Systems,2026-09-20,2026-10-04,2026-10-03,0,0,RETURNED_ON_TIME
LIB-508,STU-010,Computer Organization & Design RISC-V,978-0128122754,Hardware,2026-09-22,2026-10-06,2026-10-06,0,0,RETURNED_ON_TIME
`,

  '04_College_Event_Registration_RAW_UNCLEAN.csv': `reg_id,student_id,student_name,event_name,event_category,team_name,team_size,payment_status,fee_inr,attendance_status,registered_at
EV-1001,STU-001,Aarav Sharma,HackNexus 2026,Hackathon,CyberSentinels,4,PAID,500,CHECKED_IN,2026-10-01 10:24:00
EV-1002,STU-004,Priya Nair,HackNexus 2026,Hackathon,CyberSentinels,4,PAID,500,CHECKED_IN,2026-10-01 10:25:12
EV-1003,STU-007,Siddharth Das,AlgoWar Competitive Coding,Coding,AlgoKings,1,PAID,200,CHECKED_IN,2026-10-02 14:15:00
EV-1004,STU-003,Rohan Verma,RoboWars Arena,Robotics,SparkPlug,3,PENDING,600,NO_SHOW,2026-10-03 09:30:00
EV-1005,STU-005,Vikram Singh,RoboWars Arena,Robotics,SparkPlug,3,PAID,600,CHECKED_IN,2026-10-03 11:00:00
EV-1006,STU-008,Ananya Gupta,DesignSprint UXathon,UI/UX,PixelCrafters,2,PAID,300,CHECKED_IN,2026-10-04 16:45:00
EV-1007,STU-010,Meera Joshi,HackNexus 2026,Hackathon,GlitchHunters,4,PAID,500,CHECKED_IN,2026-10-05 12:20:00
EV-1008,STU-002,Aditi Rao,CyberForensics CaptureTheFlag,CTF,ZeroByte,2,PAID,400,CHECKED_IN,2026-10-05 18:00:00
`,

  '05_IT_Helpdesk_Tickets_RAW_UNCLEAN.csv': `ticket_id,requester_id,category,issue_title,priority,status,opened_at,resolved_at,resolution_hours,assigned_technician,resolution_summary
TCK-901,STU-001,Campus WiFi,RADIUS auth certificate expired,HIGH,CLOSED,2026-10-10 08:30:00,2026-10-10 10:45:00,2.25,Tech_Rajesh,Re-issued 802.1x PEAP client credentials
TCK-902,STU-003,Lab Workstation,Linux kernel panic in Lab 4 Machine 12,CRITICAL,CLOSED,2026-10-10 11:15:00,2026-10-10 13:00:00,1.75,Tech_Deepak,Replaced bad DDR4 RAM stick
TCK-903,STU-005,LMS Portal,Assignment submission upload error 413,MEDIUM,RESOLVED,2026-10-11 14:00:00,2026-10-11 16:30:00,2.5,Tech_Anita,Adjusted nginx client_max_body_size
TCK-904,STU-006,Hostel LAN,Port flap on Block B Floor 2 switch,HIGH,CLOSED,2026-10-12 09:00:00,2026-10-12 11:30:00,2.5,Tech_Rajesh,Re-terminated RJ45 patch cable
TCK-905,STU-007,Email Account,Spam filter blocking legitimate IEEE alerts,LOW,CLOSED,2026-10-13 13:20:00,2026-10-13 15:00:00,1.67,Tech_Anita,Whitelisted noreply@ieee.org domain
TCK-906,STU-002,VPN Gateway,Split-tunneling route table dropped,HIGH,IN_PROGRESS,2026-10-14 16:00:00,,,Tech_Deepak,Investigating OpenVPN push route directive
`,

  '06_Hostel_Maintenance_RAW_UNCLEAN.csv': `request_id,hostel_block,room_number,issue_type,urgency,reported_date,completed_date,status,assigned_worker,notes
MNT-301,Block A,204,Electrical,HIGH,2026-10-08 09:15:00,2026-10-08 11:00:00,RESOLVED,Electrician_Ramesh,Replaced MCB breaker unit
MNT-302,Block B,112,Plumbing,CRITICAL,2026-10-08 14:20:00,2026-10-08 16:30:00,RESOLVED,Plumber_Suresh,Fixed mainline connector pipe leak
MNT-303,Block C,305,Carpentry,LOW,2026-10-09 10:00:00,2026-10-10 12:00:00,RESOLVED,Carpenter_Sunil,Repaired study desk latch and hinge
MNT-304,Block A,410,Air Conditioning,MEDIUM,2026-10-10 13:00:00,2026-10-11 14:00:00,RESOLVED,HVAC_Manoj,Cleaned condenser coils and refilled gas
MNT-305,Block B,201,Plumbing,MEDIUM,2026-10-12 11:30:00,,,PENDING,Plumber_Suresh,Awaiting spare valve component
MNT-306,Block D,108,Electrical,HIGH,2026-10-13 08:45:00,2026-10-13 10:15:00,RESOLVED,Electrician_Ramesh,Repaired ceiling fan regulator
`,

  '07_Canteen_Sales_RAW_UNCLEAN.csv': `order_id,student_id,counter_id,item_name,category,unit_price_inr,quantity,total_price_inr,payment_method,order_timestamp
ORD-8001,STU-001,Counter_1,Veg South Indian Thali,Lunch,80,1,80,UPI_QR,2026-10-14 13:05:12
ORD-8002,STU-002,Counter_2,Cold Brew Coffee,Beverage,45,2,90,CAMPUS_CARD,2026-10-14 13:06:40
ORD-8003,STU-004,Counter_1,Paneer Butter Masala Combo,Lunch,110,1,110,UPI_QR,2026-10-14 13:08:15
ORD-8004,STU-007,Counter_3,Samosa Chaat Plate,Snacks,35,2,70,CASH,2026-10-14 13:10:00
ORD-8005,STU-008,Counter_2,Fresh Orange Juice,Beverage,40,1,40,CAMPUS_CARD,2026-10-14 13:12:30
ORD-8006,STU-010,Counter_1,Egg Fried Rice Bowl,Lunch,90,1,90,UPI_QR,2026-10-14 13:15:22
ORD-8007,STU-003,Counter_3,Masala Dosa,Snacks,50,1,50,UPI_QR,2026-10-14 13:18:05
ORD-8008,STU-005,Counter_2,Chocolate Frappe,Beverage,60,1,60,UPI_QR,2026-10-14 13:20:44
`,

  '08_Lab_Equipment_Inventory_RAW_UNCLEAN.csv': `asset_id,lab_id,lab_name,equipment_name,model_number,serial_number,purchase_date,last_service_date,status,operational_condition,custodian
EQ-7001,LAB_CS1,Network Security Lab,Cisco Catalyst 2960 Switch,WS-C2960X-24TS-L,FCW2145A0Z1,2023-06-15,2026-08-10,ACTIVE,OPERATIONAL,Prof_Kulkarni
EQ-7002,LAB_CS1,Network Security Lab,Palo Alto PA-220 Firewall,PAN-PA-220,012801045922,2024-01-20,2026-09-05,ACTIVE,OPERATIONAL,Prof_Kulkarni
EQ-7003,LAB_EC2,Embedded Systems Lab,Keysight DSOX1204G Oscilloscope,DSOX1204G,MY59102431,2022-11-10,2026-07-15,ACTIVE,OPERATIONAL,Dr_Rao
EQ-7004,LAB_EC2,Embedded Systems Lab,Rigol Function Generator,DG1022Z,DG1ZA2134012,2023-03-12,2026-02-18,MAINTENANCE,NEEDS_CALIBRATION,Dr_Rao
EQ-7005,LAB_CS2,High Performance Computing Lab,Dell PowerEdge R750 Server,R750-2U,4J8K9X2,2024-05-18,2026-09-20,ACTIVE,OPERATIONAL,Prof_Deshmukh
EQ-7006,LAB_ME1,Robotics & Automation Lab,Universal Robots UR5e Robotic Arm,UR5e-2023,UR5E994120,2023-08-22,2026-08-30,ACTIVE,OPERATIONAL,Dr_Patel
`,

  '09_Scholarship_Applications_RAW_UNCLEAN.csv': `application_id,student_id,student_name,branch,scholarship_scheme,annual_family_income_inr,cgpa,category,disability_status,verification_status,grant_amount_inr,academic_year
SCH-4001,STU-003,Rohan Verma,Electronics,Merit-Cum-Means State Grant,240000,6.8,OBC,NO,APPROVED,45000,2026-2027
SCH-4002,STU-006,Kavita Iyer,Civil,National Women in Tech Fellowship,180000,6.2,GENERAL,NO,UNDER_REVIEW,50000,2026-2027
SCH-4003,STU-009,Karan Malhotra,Electronics,Post-Matric Scholarship Scheme,150000,7.0,SC,NO,APPROVED,60000,2026-2027
SCH-4004,STU-011,Alok Tiwari,Civil,Rural Talent Empowerment Fund,120000,7.5,GENERAL,NO,APPROVED,40000,2026-2027
SCH-4005,STU-013,Sneha Patil,Computer Science,Pragati Scholarship Scheme,200000,6.5,GENERAL,NO,PENDING_DOCUMENTS,50000,2026-2027
SCH-4006,STU-002,Aditi Rao,Information Tech,Alumni Excellence Endowment,350000,7.4,GENERAL,NO,REJECTED,0,2026-2027
`,

  '10_Online_Learning_Activity_RAW_UNCLEAN.csv': `session_id,student_id,course_code,course_name,platform,watch_duration_minutes,quizzes_attempted,average_quiz_score,completion_percentage,device_type,last_activity_timestamp
ONL-6001,STU-001,CS-CYB-301,Advanced Network Penetration Testing,CampusMoodle,145,5,88.4,92.0,Desktop_Chrome,2026-10-18 21:30:15
ONL-6002,STU-004,CS-CLD-402,Kubernetes Production Architecture,CampusMoodle,180,6,96.0,98.5,Desktop_Linux,2026-10-18 22:15:40
ONL-6003,STU-002,IT-FOR-205,Digital Forensics & Incident Response,CampusMoodle,95,3,74.5,65.0,Laptop_Windows,2026-10-19 14:20:00
ONL-6004,STU-007,CS-AI-501,Deep Learning with PyTorch,CampusMoodle,120,4,82.0,80.0,Laptop_Mac,2026-10-19 18:45:10
ONL-6005,STU-003,EC-EMB-104,ARM Cortex-M Embedded C,CampusMoodle,45,2,58.0,40.0,Mobile_Android,2026-10-20 09:10:00
ONL-6006,STU-008,IT-UX-302,Modern Interaction Design Systems,CampusMoodle,110,4,89.5,85.0,Laptop_Windows,2026-10-20 16:30:25
ONL-6007,STU-010,CS-SEC-404,Cloud Infrastructure Vulnerability Scanning,CampusMoodle,135,5,85.0,88.0,Desktop_Chrome,2026-10-20 20:05:00
`
};

export function seedDatasetFiles(): void {
  const targetDir = path.resolve(__dirname, '../../data/datasets');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const [filename, content] of Object.entries(DATASET_CONTENTS)) {
    const fullPath = path.resolve(targetDir, filename);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
      console.log(`[DATASET SEED] Created dataset file: ${filename}`);
    } else {
      console.log(`[DATASET SEED] File already exists: ${filename}`);
    }
  }
}

if (require.main === module) {
  seedDatasetFiles();
}
