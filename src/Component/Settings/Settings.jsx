import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Stack,
  Text,
  Switch,
  Select,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaLock, FaBell, FaUser, FaShieldAlt, FaLanguage, FaMobileAlt } from 'react-icons/fa';

// Main Settings Page Component
const SettingsPage = () => {
  // State variables
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [privacySetting, setPrivacySetting] = useState('Everyone');
  const [language, setLanguage] = useState('Arabic');

  // Color settings for light mode
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  const sectionBg = useColorModeValue('gray.100', 'gray.700');
  const inputBgColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box maxW="100vw" mx="auto" py={6} px={4} bg={bgColor} color="black" minH="100vh">
      <Flex justify="center" align="center" minH="100vh">
        <Stack
          spacing={8}
          width={['100%', '90%', '70%', '50%']}
          bg={sectionBg}
          p={8}
          borderRadius="lg"
          boxShadow="2xl"
        >
          <Heading as="h1" size="lg" mb={6} color={textColor} textAlign="center">
            الإعدادات والخصوصية
          </Heading>

          {/* Account Settings */}
          <SettingsSection 
           
            icon={<FaUser  />}
           
            title="إعدادات الحساب"
            description="تحكم في معلومات حسابك، البريد الإلكتروني، وتفاصيل أخرى."
          >
            <AccountSettings inputBgColor={inputBgColor} />
          </SettingsSection>

          {/* Privacy Settings */}
          <SettingsSection
            icon={<FaShieldAlt  style={{width:"30px !important"}}/>}
            title="الخصوصية"
            description="تعديل من يمكنه رؤية معلوماتك والتفاعل مع منشوراتك."
          >
            <PrivacySettings
              privacySetting={privacySetting}
              setPrivacySetting={setPrivacySetting}
            />
          </SettingsSection>

          {/* Notifications Settings */}
          <SettingsSection
            icon={<FaBell />}
            title="الإشعارات"
            description="تحكم في الإشعارات التي تتلقاها وطريقة استلامها."
          >
            <NotificationSettings
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
            />
          </SettingsSection>

          {/* Security Settings */}
          <SettingsSection
            icon={<FaLock />}
            title="الأمان"
            description="إعداد الأمان وكلمة المرور."
          >
            <SecuritySettings inputBgColor={inputBgColor} />
          </SettingsSection>

          {/* Language Settings */}
          <SettingsSection
            icon={<FaLanguage />}
            title="اللغة"
            description="اختر اللغة المفضلة لديك."
          >
            <LanguageSettings language={language} setLanguage={setLanguage} />
          </SettingsSection>

          {/* App Settings */}
          <SettingsSection
            icon={<FaMobileAlt />}
            title="إعدادات التطبيق"
            description="تخصيص إعدادات التطبيق والإشعارات."
          >
            <AppSettings />
          </SettingsSection>
        </Stack>
      </Flex>
    </Box>
  );
};

// Reusable component for each section
const SettingsSection = ({ icon, title, description, children }) => {
  const sectionBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');

  return (
    <Box bg={sectionBg} p={6} borderRadius="lg" shadow="lg">
      <Flex align="center" mb={4}>
        <IconButton
          icon={icon}
          variant="outline"
          size="lg"
          colorScheme="blue"
          aria-label={title}
          style={{width:"30px"}}
          me={2}
          mr={4}
        />
        <Heading as="h3" size="md" color={textColor}>
          {title}
        </Heading>
      </Flex>
      <Text mb={4} color="gray.500">
        {description}
      </Text>
      {children}
    </Box>
  );
};

// Account Settings Component
const AccountSettings = ({ inputBgColor }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" color="black">
            تعديل بيانات الحساب
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Stack spacing={4}>
            <Input placeholder="تغيير الاسم" bg={inputBgColor} color="black" />
            <Input placeholder="تغيير البريد الإلكتروني" type="email" bg={inputBgColor} color="black" />
            <Button colorScheme="blue" width="full">
              حفظ التغييرات
            </Button>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

// Privacy Settings Component
const PrivacySettings = ({ privacySetting, setPrivacySetting }) => {
  return (
    <Stack spacing={4}>
      <Text color="gray.500">من يمكنه رؤية منشوراتك؟</Text>
      <Select
        value={privacySetting}
        onChange={(e) => setPrivacySetting(e.target.value)}
        color="black"
        bg="gray.200"
      >
        <option value="Everyone">الجميع</option>
        <option value="Friends">الأصدقاء فقط</option>
        <option value="OnlyMe">أنا فقط</option>
      </Select>
    </Stack>
  );
};

// Notification Settings Component
const NotificationSettings = ({ emailNotifications, setEmailNotifications }) => {
  return (
    <Stack spacing={4}>
      <Text color="gray.500">الإشعارات عبر البريد الإلكتروني</Text>
      <Switch
        isChecked={emailNotifications}
        onChange={() => setEmailNotifications(!emailNotifications)}
        colorScheme="blue"
        size="lg"
      >
        تلقي الإشعارات عبر البريد الإلكتروني
      </Switch>
    </Stack>
  );
};

// Security Settings Component
const SecuritySettings = ({ inputBgColor }) => {
  return (
    <Stack spacing={4}>
      <Text color="gray.500">تغيير كلمة المرور</Text>
      <Input placeholder="كلمة المرور الحالية" type="password" bg={inputBgColor} color="black" />
      <Input placeholder="كلمة المرور الجديدة" type="password" bg={inputBgColor} color="black" />
      <Input placeholder="تأكيد كلمة المرور" type="password" bg={inputBgColor} color="black" />
      <Button colorScheme="blue" width="full">
        تغيير كلمة المرور
      </Button>
    </Stack>
  );
};

// Language Settings Component
const LanguageSettings = ({ language, setLanguage }) => {
  return (
    <Stack spacing={4}>
      <Text color="gray.500">اختر اللغة المفضلة</Text>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        bg="gray.200"
        color="black"
      >
        <option value="Arabic">العربية</option>
        <option value="English">English</option>
        <option value="French">Français</option>
      </Select>
    </Stack>
  );
};

// App Settings Component
const AppSettings = () => {
  return (
    <Stack spacing={4}>
      <Text color="gray.500">إعدادات التطبيق</Text>
      <Switch colorScheme="blue" size="lg">
        تفعيل الوضع الليلي
      </Switch>
      <Switch colorScheme="blue" size="lg">
        تقليل استهلاك البيانات
      </Switch>
    </Stack>
  );
};

export default SettingsPage;
