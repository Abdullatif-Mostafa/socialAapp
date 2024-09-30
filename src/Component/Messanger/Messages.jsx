import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  AvatarBadge,
} from "@chakra-ui/react";
import { FiSend, FiMenu, FiSmile, FiPaperclip, FiVideo, FiPhone, FiSearch, FiMoreVertical } from "react-icons/fi";

// بيانات المحادثات
const conversations = [
  { id: 1, name: "Ahmed", statusCase: "online", message: "كيف حالك؟", avatar: "https://bit.ly/kent-c-dodds", status: "نشط الآن" },
  { id: 2, name: "Saad", statusCase: "online", message: "هل أنت هنا؟", avatar: "https://bit.ly/dan-abramov", status: "نشط الآن" },
  { id: 3, name: "Ali", statusCase: "offline", message: "لديك وقت للدردشة؟", avatar: "https://bit.ly/code-beast", status: "نشط منذ ساعة" },
  { id: 4, name: "Mohamed", statusCase: "offline", message: "السلام عليكم ورحمه الله وبركاته", avatar: "https://bit.ly/prosper-baba", status: "نشط منذ 10 ساعة" },
];

// بيانات الرسائل
const initialMessagesData = {
  "ahmed": [
    { statusCase: "online", sender: "Ahmed", text: "كيف حالك؟", time: "10:30 AM" },
    { statusCase: "offline", sender: "me", text: "أنا بخير، شكراً لك!", time: "10:31 AM" },
    { statusCase: "offline", sender: "Ahmed", text: "هل تود الخروج اليوم؟", time: "10:32 AM" }
  ],
  "saad": [
    { statusCase: "online", sender: "Saad", text: "هل أنت هنا؟", time: "11:00 AM" },
    { statusCase: "online", sender: "me", text: "نعم، أنا هنا.", time: "11:01 AM" },
    { statusCase: "online", sender: "Saad", text: "رائع! دعنا نتحدث.", time: "11:02 AM" }
  ],
  "ali": [
    { statusCase: "offline", sender: "Ali", text: "لديك وقت للدردشة؟", time: "12:00 PM" },
    { statusCase: "offline", sender: "me", text: "نعم، ما الجديد؟", time: "12:05 PM" },
    { statusCase: "online", sender: "Ali", text: "كل شيء على ما يرام.", time: "12:10 PM" }
  ],
  "mohamed": [
    { statusCase: "offline", sender: "Mohamed", text: "السلام عليكم ورحمه الله وبركاته", time: "1:00 PM" },
    { statusCase: "offline", sender: "me", text: "وعليكم السلام ورحمة الله وبركاته.", time: "1:05 PM" },
    { statusCase: "online", sender: "Mohamed", text: "كيف يمكنني مساعدتك اليوم؟", time: "1:10 PM" }
  ]
};

const Messenger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // تهيئة المحادثة المختارة والمراسلات
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messagesData, setMessagesData] = useState(initialMessagesData);
  const [messages, setMessages] = useState(initialMessagesData[selectedConversation.name.toLowerCase()] || []);
  const [messageInput, setMessageInput] = useState("");

  // دالة لإرسال رسالة
  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const newMessage = { sender: "me", text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");

      // تحديث بيانات الرسائل للمحادثة الحالية
      setMessagesData((prevMessagesData) => {
        const convKey = selectedConversation.name.toLowerCase();
        const updatedMessages = prevMessagesData[convKey] ? [...prevMessagesData[convKey], newMessage] : [newMessage];
        return { ...prevMessagesData, [convKey]: updatedMessages };
      });
    }
  };

  // دالة لاختيار محادثة جديدة
  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    const convKey = conv.name.toLowerCase();
    setMessages(messagesData[convKey] || []);
  };

  return (
    <Flex height="100vh" bg="gray.100" color={"gray.600"}>
      {/* قائمة المحادثات - الشريط الجانبي */}
      {isMobile ? (
        <>
          <IconButton
            icon={<FiMenu />}
            position="absolute"
            top="10px"
            left="10px"
            zIndex={1000}
            onClick={onOpen}
            color={"gray.600"}
            aria-label="Open Menu"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>المحادثات</DrawerHeader>
              <DrawerBody>
                <VStack align="stretch">
                  {conversations.map((conv) => (
                    <Flex
                      key={conv.id}
                      p={3}
                      borderBottom="1px solid #eaeaea"
                      cursor="pointer"
                      onClick={() => {
                        handleSelectConversation(conv);
                        onClose();
                      }}
                      bg={selectedConversation.id === conv.id ? "gray.100" : "white"}
                    >
                      <Avatar src={conv.avatar} name={conv.name} size="md" mr={3}>
                        {conv.statusCase === "online" ? <AvatarBadge boxSize='1.25em' bg='green.500' /> : null}
                      </Avatar>

                      <Box>
                        <Text fontWeight="bold">{conv.name}</Text>
                        <Text fontSize="sm" color="gray.500">{conv.message}</Text>
                        <Text fontSize="xs" color="gray.400">{conv.status}</Text>
                      </Box>
                    </Flex>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box w="300px" borderRight="1px solid #eaeaea" p={4} bg="white" overflowY="auto">
          <Text fontSize="xl" fontWeight="bold" mb={4}>المحادثات</Text>
          <VStack align="stretch">
            {conversations.map((conv) => (
              <Flex
                key={conv.id}
                p={1}
                borderBottom="1px solid #eaeaea"
                cursor="pointer"
                onClick={() => handleSelectConversation(conv)}
                bg={selectedConversation.id === conv.id ? "gray.100" : "white"}
              >
                <Avatar src={conv.avatar} name={conv.name} size="md" mr={3}>
                  {conv.statusCase === "online" ? <AvatarBadge boxSize='1.25em' bg='green.500' /> : null}
                </Avatar>
                <Box mr={1}>
                  <Text fontWeight="bold" mb={0}>{conv.name}</Text>
                  <Text fontSize="xs" color="gray.400">{conv.status}</Text>
                  <Text fontSize="sm" color="gray.500">{conv.message}</Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      )}

      {/* نافذة الدردشة */}
      <Flex flex="1" direction="column" bg="white" p={4} position="relative">
        {selectedConversation ? (
          <>
            {/* رأس الدردشة */}
            <Flex align="center" borderBottom="1px solid #eaeaea" pb={3} mb={3} justifyContent="space-between">
              <HStack>
                <Avatar src={selectedConversation.avatar} name={selectedConversation.name} size="md" mb={3}>
                  {selectedConversation.statusCase === "online" ? <AvatarBadge boxSize='1.25em' bg='green.500' /> : null}
                </Avatar>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={0}>{selectedConversation.name}</Text>
                  <Text fontSize="xs" color="gray.400">{selectedConversation.status}</Text>
                </Box>
              </HStack>
              <HStack spacing={4}>
                <IconButton icon={<FiVideo />} aria-label="Video Call" />
                <IconButton icon={<FiPhone />} aria-label="Voice Call" />
                <IconButton icon={<FiSearch />} aria-label="Search in Conversation" />
                <IconButton icon={<FiMoreVertical />} aria-label="Options" />
              </HStack>
            </Flex>

            {/* رسائل الدردشة */}
            <VStack flex="1" spacing={4} overflowY="auto" align="stretch" mb={4}>
              {messages.map((message, idx) => (
                <Box key={idx} alignSelf={message.sender === "me" ? "flex-end" : "flex-start"}>
                  <Box
                    bg={message.sender === "me" ? "blue.100" : "gray.100"}
                    p={3}
                    borderRadius="lg"
                    maxW=""
                  >
                    <Text mb={1}>{message.text}</Text>
                    <Text mb={0} fontSize="xs" color="gray.400" textAlign="right">
                      {message.time}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>

            {/* حقل إدخال الرسالة */}
            <HStack spacing={2} position="fixed" bottom="0" left="0" width="100%" p={4} bg="white" zIndex={10} borderTop="1px solid #eaeaea">
              <IconButton icon={<FiSmile />} aria-label="Emoji" />
              <IconButton icon={<FiPaperclip />} aria-label="Attachment" />
              <Input
                placeholder="اكتب رسالة..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <IconButton
                icon={<FiSend />}
                colorScheme="blue"
                onClick={handleSendMessage}
                isDisabled={!messageInput.trim()}
                aria-label="Send Message"
              />
            </HStack>
          </>
        ) : (
          <Flex align="center" justify="center" height="100%">
            <Text fontSize="lg" color="gray.500">
              اختر محادثة لبدء الدردشة
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Messenger;
