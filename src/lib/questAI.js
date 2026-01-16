// AI Service for Quest Suggestions
export class QuestAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseUrl = "https://api.openai.com/v1";
  }

  

  async analyzeGoal(goal, userHistory = null) {
    try {
      const prompt = this.buildPrompt(goal, userHistory);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a productivity expert that breaks down goals into manageable quests. Always return valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("AI Service Error:", error);
      return this.getFallbackSuggestions(goal);
    }
  }

  buildPrompt(goal, userHistory) {
    const historyContext = userHistory
      ? `User has completed ${userHistory.completedQuests || 0} quests before. 
       Average completion time: ${
         userHistory.avgCompletionTime || "unknown"
       } days.
       Preferred difficulty: ${userHistory.preferredDifficulty || "medium"}.`
      : "No user history available.";

    return `
      Break down this goal into a structured quest: "${goal}"
      
      ${historyContext}
      
      Return a JSON object with:
      {
        "title": "Catchy quest title",
        "description": "Motivating description",
        "category": "fitness|learning|career|personal|creative",
        "difficulty": "easy|medium|hard",
        "estimatedDays": number,
        "tasks": [
          {
            "title": "Task title",
            "description": "What to do",
            "estimatedHours": number,
            "order": number
          }
        ],
        "milestones": [
          {
            "title": "Milestone title", 
            "position": percentage (0-100),
            "description": "Why this matters"
          }
        ]
      }
      
      Keep tasks actionable and specific. Limit to 5-8 tasks maximum.
    `;
  }

  parseResponse(content) {
    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No JSON found in response");
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return this.getFallbackSuggestions();
    }
  }

  getFallbackSuggestions(goal) {
    // Fallback when AI fails
    const category = this.detectCategory(goal);
    const difficulty = this.detectDifficulty(goal);

    return {
      title: goal,
      description: `Quest to achieve: ${goal}`,
      category,
      difficulty,
      estimatedDays:
        difficulty === "easy" ? 7 : difficulty === "medium" ? 14 : 30,
      tasks: this.generateBasicTasks(goal, category),
      milestones: this.generateBasicMilestones(),
    };
  }

  detectCategory(goal) {
    const keywords = {
      fitness: ["exercise", "gym", "run", "workout", "health", "weight", "fit"],
      learning: [
        "learn",
        "study",
        "course",
        "master",
        "skill",
        "education",
        "certification",
      ],
      career: [
        "job",
        "career",
        "promotion",
        "business",
        "freelance",
        "project",
      ],
      personal: ["read", "habit", "routine", "meditate", "journal", "organize"],
      creative: [
        "write",
        "draw",
        "paint",
        "music",
        "create",
        "design",
        "build",
      ],
    };

    const lowerGoal = goal.toLowerCase();
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some((word) => lowerGoal.includes(word))) {
        return category;
      }
    }
    return "personal";
  }

  detectDifficulty(goal) {
    const timeKeywords = {
      easy: ["quick", "simple", "basic", "intro", "start"],
      medium: ["improve", "learn", "build", "create", "develop"],
      hard: [
        "master",
        "expert",
        "advanced",
        "complete",
        "launch",
        "professional",
      ],
    };

    const lowerGoal = goal.toLowerCase();
    for (const [difficulty, words] of Object.entries(timeKeywords)) {
      if (words.some((word) => lowerGoal.includes(word))) {
        return difficulty;
      }
    }
    return "medium";
  }

  generateBasicTasks(goal, category) {
    const taskTemplates = {
      fitness: [
        {
          title: "Set baseline measurements",
          description: "Record current stats",
          estimatedHours: 1,
          order: 1,
        },
        {
          title: "Create workout plan",
          description: "Schedule exercise routine",
          estimatedHours: 2,
          order: 2,
        },
        {
          title: "First week execution",
          description: "Complete planned workouts",
          estimatedHours: 5,
          order: 3,
        },
        {
          title: "Progress check",
          description: "Measure improvements",
          estimatedHours: 1,
          order: 4,
        },
        {
          title: "Goal achievement",
          description: "Reach target fitness level",
          estimatedHours: 3,
          order: 5,
        },
      ],
      learning: [
        {
          title: "Research resources",
          description: "Find learning materials",
          estimatedHours: 3,
          order: 1,
        },
        {
          title: "Create study schedule",
          description: "Plan learning timeline",
          estimatedHours: 2,
          order: 2,
        },
        {
          title: "Complete first module",
          description: "Finish initial topics",
          estimatedHours: 8,
          order: 3,
        },
        {
          title: "Practice exercises",
          description: "Apply learned concepts",
          estimatedHours: 6,
          order: 4,
        },
        {
          title: "Final assessment",
          description: "Test knowledge gained",
          estimatedHours: 2,
          order: 5,
        },
      ],
      career: [
        {
          title: "Define objectives",
          description: "Clarify career goals",
          estimatedHours: 2,
          order: 1,
        },
        {
          title: "Skill assessment",
          description: "Evaluate current abilities",
          estimatedHours: 3,
          order: 2,
        },
        {
          title: "Development plan",
          description: "Create improvement roadmap",
          estimatedHours: 4,
          order: 3,
        },
        {
          title: "Execute milestones",
          description: "Complete key objectives",
          estimatedHours: 15,
          order: 4,
        },
        {
          title: "Achievement review",
          description: "Evaluate results",
          estimatedHours: 2,
          order: 5,
        },
      ],
      personal: [
        {
          title: "Goal clarification",
          description: "Define what success looks like",
          estimatedHours: 1,
          order: 1,
        },
        {
          title: "Break down into steps",
          description: "Create actionable plan",
          estimatedHours: 2,
          order: 2,
        },
        {
          title: "First milestone",
          description: "Complete initial phase",
          estimatedHours: 5,
          order: 3,
        },
        {
          title: "Progress tracking",
          description: "Monitor advancement",
          estimatedHours: 2,
          order: 4,
        },
        {
          title: "Goal completion",
          description: "Achieve final objective",
          estimatedHours: 3,
          order: 5,
        },
      ],
    };

    return taskTemplates[category] || taskTemplates.personal;
  }

  generateBasicMilestones() {
    return [
      {
        title: "Getting Started",
        position: 25,
        description: "Initial progress made",
      },
      {
        title: "Halfway There",
        position: 50,
        description: "Significant progress achieved",
      },
      {
        title: "Almost Done",
        position: 75,
        description: "Final stretch begins",
      },
      {
        title: "Goal Achieved",
        position: 100,
        description: "Quest completed successfully!",
      },
    ];
  }
}

console.log('API Key:', process.env.OPENAI_API_KEY ? 'Found' : 'Not found');
console.log('API Key starts with sk-:', process.env.OPENAI_API_KEY?.startsWith('sk-'));
// Singleton instance
export const questAI = new QuestAIService();
