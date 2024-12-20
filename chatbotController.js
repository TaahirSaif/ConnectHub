const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key in an .env file
});

const openai = new OpenAIApi(configuration);

exports.chatbotResponse = async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botMessage = response.data.choices[0].message.content;
    res.status(200).json({ botMessage });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error communicating with the AI chatbot');
  }
};
