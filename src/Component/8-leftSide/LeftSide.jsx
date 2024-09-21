import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import './left.css'; // Custom CSS for fixed sidebar
import { FaUserCircle } from 'react-icons/fa';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  const friends = [
    { id: 1, name: 'عبدالله سعيد', avatar: 'https://bit.ly/sage-adebayo',status:"online"},
    { id: 2, name: 'ريم عادل', avatar: 'https://bit.ly/code-beast',status:"online"},
    { id: 3, name: 'يوسف أحمد', avatar: 'https://bit.ly/prosper-baba',status:"online" },
    { id: 4, name: 'نادية مصطفى', avatar: 'https://bit.ly/dan-abramov',status:"online" },
    { id: 5, name: 'علي احمد', avatar:'https://bit.ly/tioluwani-kolawole',status:"online" },
    { id: 6, name: 'محمد عبدالله', avatar:'https://bit.ly/kent-c-dodds',status:"online" },
    { id: 7, name: 'مصطفى عبدالله', avatar:'https://bit.ly/ryan-florence',status:"line" },
    { id: 8, name: 'Ahmed Ali ', avatar:'https://bit.ly/dan-abramov' ,status:"offline"},
    { id: 9, name: 'Adel Nady ', avatar: 'path/to/avatar14.png' ,status:"offline"},

  ];
  const groups = [
    { id: 1, name: ' محبي السفر' },       // Travel Lovers Group
    { id: 2, name: ' تعلم البرمجة' },     // Programming Learning Group
    { id: 3, name: ' عشاق الرياضة' },     // Sports Fans Group
    { id: 4, name: ' المأكولات الصحية' }, // Healthy Food Group
    { id: 5, name: ' الكتب والمطالعة' },
    { id: 6, name: ' مليون مبرمج' }  // Books & Reading Group
  ];


  return (
    <>
      <div className="left-sidebar" style={{ borderBottom: "1px solid #eee" }}>
        <h5 className='text-dark'>الرسائل</h5>
        <ListGroup variant="flush">
          {friends.map((user) => (
            <ListGroup.Item  key={user.id} style={{ fontSize: "16px",cursor:"pointer", border: "none", backgroundColor: "#f5f6f7" }} className="messenger-contact mb-1 d-flex gap-2">
             <Link to="/PersonChat" style={{display:"flex",cursor:"pointer",alignItems:"center",gap:"10px"}}>
                <Avatar src={user.avatar} cursor={"pointer"}>
                  {user.status==="online"?<AvatarBadge boxSize='1.25em' bg='green.500' />:null}
                </Avatar>
                {user.name}
             </Link>             
            </ListGroup.Item>
          ))}
        </ListGroup>


        <h5 className='text-dark'>المجموعات</h5>
        <ListGroup variant="flush">
          {groups.map((group) => (
            <ListGroup.Item key={group.id} style={{ fontSize: "17px", border: "none", backgroundColor: "#f5f6f7" }} className="messenger-contact mb-1 d-flex gap-2">
              <FaUserCircle className="contact-icon" size={32} />
              {group.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default LeftSidebar;
