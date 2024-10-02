import React from 'react';
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useToast
} from '@chakra-ui/react';
import { FiFacebook, FiTwitter, FiLinkedin, FiCopy, FiMessageCircle } from 'react-icons/fi';
import { BiShare } from 'react-icons/bi';

const SharePost = (props) => {
    // console.log("props ",props)
    const { postUri } = props;
    // console.log("post url",postUri)
    const toast = useToast();

    // Function to handle sharing on social media platforms
    const handleShare = (platform) => {
        const url = encodeURIComponent(postUri);
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${url}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Function to copy the URI and show the toast
    const handleCopy = () => {
        navigator.clipboard.writeText(`https://social-aapp.vercel.app/posts/${postUri}`);
        toast({
            title: 'تم نسخ الرابط.',
            description: 'تم نسخ رابط المنشور إلى الحافظة.',
            status: 'success',
            duration: 1400,
            // isClosable: true,
            position: 'top',
        });
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    مشاركة 
                </Button>
            </PopoverTrigger>
            <PopoverContent  me={3} width={"200px"} height={"250px"}>
                {/* <PopoverArrow /> */}
                <PopoverCloseButton _hover={{ backgroundColor: "gray.300" }} color={"gray.800"} />
                <PopoverHeader color={""} mr={6}>شارك المنشور</PopoverHeader>
                <PopoverBody flex={1} flexDirection={"column"} width={"200px"} >
                    <Button
                        flex={1}
                        justifyContent={"flex-start"}
                        padding={"6px 10px"}
                        w='full'
                        variant='ghost'
                        leftIcon={<FiFacebook />}
                        onClick={() => handleShare('facebook')}
                    >
                        فيسبوك
                    </Button>
                    <Button
                        flex={1}
                        justifyContent={"flex-start"}
                        padding={"6px 10px"}
                        w='full'
                        variant='ghost'
                        leftIcon={<FiTwitter />}
                        onClick={() => handleShare('twitter')}
                    >
                        تويتر
                    </Button>
                    <Button
                        flex={1}
                        justifyContent={"flex-start"}
                        padding={"6px 10px"}
                        w='full'
                        variant='ghost'
                        leftIcon={<FiLinkedin />}
                        onClick={() => handleShare('linkedin')}
                    >
                        لينكدإن
                    </Button>
                    <Button
                        flex={1}
                        justifyContent={"flex-start"}
                        padding={"6px 10px"}
                        w='full'
                        variant='ghost'
                        leftIcon={<FiMessageCircle />}
                        onClick={() => handleShare('whatsapp')}
                    >
                        واتساب
                    </Button>
                    <Button
                        flex={1}
                        justifyContent={"flex-start"}
                        padding={"6px 10px"}
                        w='full'
                        variant='ghost'
                        leftIcon={<FiCopy />}
                        onClick={handleCopy} // Use handleCopy for copying the URI
                    >
                        نسخ الرابط
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default SharePost;
