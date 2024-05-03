import { Box, Button, Container, Textarea, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { create } from "lib/openai";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const response = await create([{ role: "user", content: inputText }], "gpt-3.5-turbo");
      setSummary(response.choices[0].message.content);
    } catch (error) {
      console.error("Error in summarizing:", error);
      setSummary("Failed to generate summary. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Text Summarizer
        </Text>
        <Textarea placeholder="Enter your text here..." value={inputText} onChange={handleInputChange} size="lg" height="200px" />
        <Button onClick={handleSummarize} isLoading={isLoading} colorScheme="blue" size="lg">
          Summarize Text
        </Button>
        <Textarea placeholder="Summary will appear here..." value={summary} isReadOnly size="lg" height="200px" />
      </VStack>
    </Container>
  );
};

export default Index;
