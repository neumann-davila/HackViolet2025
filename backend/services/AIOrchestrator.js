const OpenAI = require("openai");
require('dotenv').config();


// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OpenAIAPIKey
});


let assistant;
let thread;
async function setup() {
  assistant = await openai.beta.assistants.create({
    name: "Teacher's Aid",
    instructions:  "",
    model: "gpt-3.5-turbo",
  });

  thread = await openai.beta.threads.create();
}

setup();


async function checkStatus(run) {
  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    for (const interaction of messages.data.reverse()) {
      console.log(`${interaction.role} > ${interaction.content[0].text.value}`);
    }
    messages.data.reverse();
    return messages.data[0].content[0].text.value;
  } else if (run.required_action && run.required_action.submit_tool_outputs && run.required_action.submit_tool_outputs.tool_calls) {
    return "{{TOOL}}<<" + run.required_action.submit_tool_outputs.tool_calls[0].function.name + ">>";
  } else {
    console.log(run.status);
  }
}

async function submitRequest(message)  {
  // ChatGPT call structure with prompt

  const request = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: message
    }
  );

  let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: assistant.id,
    }
  );
  return checkStatus(run);
}

module.exports = {
  submitRequest
}