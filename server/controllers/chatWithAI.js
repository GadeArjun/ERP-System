const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
   const {userMessage} = req.body;
    console.log(userMessage);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: userMessage }],
    });

    const aiResponse =
      completion.choices[0]?.message?.content || "No response received.";

    res.status(200).json(aiResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
