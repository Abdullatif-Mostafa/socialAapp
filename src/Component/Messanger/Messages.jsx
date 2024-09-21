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
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { FiSend, FiMenu, FiSmile, FiPaperclip, FiVideo, FiPhone, FiSearch, FiMoreVertical } from "react-icons/fi";
import { AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

// Sample chat data
const conversations = [
  { id: 1, name: "Ahmed", message: "كيف حالك؟", avatar: "https://example.com/ahmed.jpg", status: "نشط الآن" },
  { id: 2, name: "Sara", message: "هل أنت هنا؟", avatar: "https://example.com/sara.jpg", status: "نشط منذ 10 دقائق" },
  { id: 3, name: "Ali", message: "لديك وقت للدردشة؟", avatar: "https://example.com/ali.jpg", status: "نشط منذ ساعة" },
];

const messagesData = [
  { sender: "Ahmed", text: "كيف حالك؟", time: "10:30 AM" },
  { sender: "me", text: "أنا بخير، شكراً لك!", time: "10:31 AM" },
  { sender: "Ahmed", text: "هل تود الخروج اليوم؟", time: "10:32 AM" },
];

const Messenger = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", text: messageInput, time: new Date().toLocaleTimeString() },
      ]);
      setMessageInput("");
    }
  };

  return (
    <Flex height="100vh" bg="gray.100" color={"gray.600"}>
      {/* Chat List Sidebar */}
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
                        setSelectedConversation(conv);
                        onClose();
                      }}
                    >
                      <Avatar src={conv.avatar} name={conv.name} size="md" mr={3} />
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
                p={3}
                borderBottom="1px solid #eaeaea"
                cursor="pointer"
                onClick={() => setSelectedConversation(conv)}
              >
                <Avatar src={conv.avatar} name={conv.name} size="md" mr={3} me={2} />
                <Box>
                  <Text fontWeight="bold">{conv.name}</Text>
                  <Text fontSize="sm" color="gray.500">{conv.message}</Text>
                  <Text fontSize="xs" color="gray.400">{conv.status}</Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      )}

      {/* Chat Window */}
      <Flex flex="1" direction="column" bg="white" p={4}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <Flex align="center" borderBottom="1px solid #eaeaea" pb={3} mb={3} justifyContent="space-between">
              <HStack>
                <Avatar src={selectedConversation.avatar} name={selectedConversation.name} size="md" mb={3} />
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={0}> {selectedConversation.name}</Text>
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

            {/* Chat Messages */}
            <VStack flex="1" spacing={4} overflowY="auto" align="stretch">
              {messages.map((message, idx) => (
                <Box key={idx} alignSelf={message.sender === "me" ? "flex-end" : "flex-start"}>
                  <Box
                    bg={message.sender === "me" ? "blue.100" : "gray.100"}
                    p={3}
                    borderRadius="lg"
                    // maxW="70%"
                  >
                    <Text mb={1}>{message.text}</Text>
                    <Text mb={0} fontSize="xs" color="gray.400" textAlign="right">
                      {message.time}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>

            {/* Input Message */}
            <HStack mt={4} spacing={2} position="fixed" bottom="0" left="0" width="100%" p={4} bg="white" zIndex={10} borderTop="1px solid #eaeaea">
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
