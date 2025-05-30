"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Expanded suggestions data with 50 activities per category
const suggestionsList = [
  // BREATH WORK ACTIVITIES (50)
  {
    id: 1,
    title: "Box Breathing Technique",
    description: "Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 5 minutes.",
    category: "breath",
  },
  {
    id: 2,
    title: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Reduces anxiety quickly.",
    category: "breath",
  },
  {
    id: 3,
    title: "Alternate Nostril Breathing",
    description: "Close right nostril, inhale left, close left nostril, exhale right. Balances the nervous system.",
    category: "breath",
  },
  {
    id: 4,
    title: "Diaphragmatic Breathing",
    description: "Place hand on belly, breathe deeply into diaphragm. Reduces stress and improves oxygen flow.",
    category: "breath",
  },
  {
    id: 5,
    title: "Breath of Fire",
    description: "Quick, rhythmic breaths through the nose with active exhales. Energizes the body and mind.",
    category: "breath",
  },
  {
    id: 6,
    title: "Pursed Lip Breathing",
    description: "Inhale through nose, exhale slowly through pursed lips. Helps with respiratory conditions.",
    category: "breath",
  },
  {
    id: 7,
    title: "Coherent Breathing",
    description: "Breathe at rate of 5-6 breaths per minute. Optimizes heart rate variability and reduces stress.",
    category: "breath",
  },
  {
    id: 8,
    title: "Sitali Breath",
    description: "Curl tongue, inhale through mouth, exhale through nose. Cooling breath for stress and anger.",
    category: "breath",
  },
  {
    id: 9,
    title: "Ujjayi Breath",
    description: "Breathe through nose with slight constriction in throat, creating ocean sound. Calms the mind.",
    category: "breath",
  },
  {
    id: 10,
    title: "Kapalabhati Breathing",
    description: "Passive inhale, forceful exhale through nose. Energizes and clears mind, strengthens core.",
    category: "breath",
  },
  {
    id: 11,
    title: "Bhramari (Bee Breath)",
    description: "Inhale, then exhale with humming sound. Reduces stress, anxiety, and anger immediately.",
    category: "breath",
  },
  {
    id: 12,
    title: "Wim Hof Method",
    description: "30-40 deep breaths, exhale and hold, deep inhale and hold. Increases energy and immunity.",
    category: "breath",
  },
  {
    id: 13,
    title: "Lion's Breath",
    description: "Inhale through nose, exhale forcefully with tongue out. Releases tension in face and throat.",
    category: "breath",
  },
  {
    id: 14,
    title: "Buteyko Breathing",
    description: "Breathe lightly through nose, brief holds after exhale. Improves asthma and sleep disorders.",
    category: "breath",
  },
  {
    id: 15,
    title: "Bellows Breath",
    description: "Rapid inhales and exhales through nose. Increases alertness and energy quickly.",
    category: "breath",
  },
  {
    id: 16,
    title: "Humming Bee Breath",
    description: "Inhale deeply, exhale with humming sound. Calms mind and helps with insomnia and anxiety.",
    category: "breath",
  },
  {
    id: 17,
    title: "Skull Shining Breath",
    description: "Forceful exhales with passive inhales. Clears sinuses and energizes the body.",
    category: "breath",
  },
  {
    id: 18,
    title: "Breath Counting",
    description: "Count each exhale up to 10, then restart. Simple technique to build focus and mindfulness.",
    category: "breath",
  },
  {
    id: 19,
    title: "Extended Exhale Breathing",
    description: "Make exhales twice as long as inhales. Activates relaxation response and reduces anxiety.",
    category: "breath",
  },
  {
    id: 20,
    title: "Three-Part Breath",
    description: "Fill belly, ribcage, then chest with breath. Complete breath that maximizes lung capacity.",
    category: "breath",
  },
  {
    id: 21,
    title: "Breath Visualization",
    description: "Imagine breathing in light, exhaling darkness. Combines breath with visualization for calm.",
    category: "breath",
  },
  {
    id: 22,
    title: "Straw Breathing",
    description: "Breathe through a straw for 2-3 minutes. Builds lung capacity and breath control.",
    category: "breath",
  },
  {
    id: 23,
    title: "Breath Walking",
    description: "Synchronize breath with steps while walking. Combines movement with breath awareness.",
    category: "breath",
  },
  {
    id: 24,
    title: "Morning Breath Reset",
    description: "10 deep breaths first thing in morning. Sets positive tone and intention for the day.",
    category: "breath",
  },
  {
    id: 25,
    title: "Elevator Breath",
    description: "Visualize breath moving up spine on inhale, down on exhale. Energizes and centers the body.",
    category: "breath",
  },
  {
    id: 26,
    title: "4-4-4-4 Combat Breath",
    description: "Military technique: inhale 4, hold 4, exhale 4, hold 4. Manages stress in high-pressure situations.",
    category: "breath",
  },
  {
    id: 27,
    title: "Breath Retention",
    description: "Hold breath after inhale for increasing intervals. Builds CO2 tolerance and lung capacity.",
    category: "breath",
  },
  {
    id: 28,
    title: "Sighing Breath",
    description: "Deep inhale, audible sigh on exhale. Releases tension and promotes relaxation.",
    category: "breath",
  },
  {
    id: 29,
    title: "Breath of Joy",
    description: "Three short inhales with arm movements, one long exhale. Energizes and uplifts mood.",
    category: "breath",
  },
  {
    id: 30,
    title: "Breath Meditation",
    description: "Focus entirely on natural breath for 5-10 minutes. Builds mindfulness and present awareness.",
    category: "breath",
  },
  {
    id: 31,
    title: "Resonant Breathing",
    description: "Breathe at rate of 5-7 breaths per minute. Optimizes heart-brain coherence and reduces stress.",
    category: "breath",
  },
  {
    id: 32,
    title: "Breath Awareness",
    description: "Simply notice natural breath without changing it. Builds mindfulness and reduces stress.",
    category: "breath",
  },
  {
    id: 33,
    title: "Cooling Breath",
    description: "Curl tongue and inhale, exhale through nose. Reduces body temperature and calms the mind.",
    category: "breath",
  },
  {
    id: 34,
    title: "Breath Holding",
    description: "After normal exhale, hold breath for comfortable duration. Increases CO2 tolerance and focus.",
    category: "breath",
  },
  {
    id: 35,
    title: "Breath Sound Awareness",
    description: "Focus on the sound of your breath. Deepens meditation and present moment awareness.",
    category: "breath",
  },
  {
    id: 36,
    title: "Breath and Mantra",
    description: "Pair breath with silent mantra like 'peace' or 'calm'. Deepens relaxation response.",
    category: "breath",
  },
  {
    id: 37,
    title: "Breath Journaling",
    description: "Record observations about your breath patterns. Increases awareness of breath-emotion connection.",
    category: "breath",
  },
  {
    id: 38,
    title: "Breath Scanning",
    description: "Notice how breath feels in different parts of body. Builds body awareness and mindfulness.",
    category: "breath",
  },
  {
    id: 39,
    title: "Breath Balancing",
    description: "Equalize length of inhale and exhale. Creates balance in nervous system and emotions.",
    category: "breath",
  },
  {
    id: 40,
    title: "Breath Surfing",
    description: "Visualize riding waves of breath. Helps manage pain and difficult emotions.",
    category: "breath",
  },
  {
    id: 41,
    title: "Breath Counting Backwards",
    description: "Count from 10 to 1 with each exhale. Calming technique for anxiety and sleep preparation.",
    category: "breath",
  },
  {
    id: 42,
    title: "Breath Expansion",
    description: "Focus on expanding breath into different areas of lungs. Increases lung capacity and oxygen.",
    category: "breath",
  },
  {
    id: 43,
    title: "Breath Rhythm Awareness",
    description: "Notice natural rhythm of breath without changing it. Builds mindfulness and reduces stress.",
    category: "breath",
  },
  {
    id: 44,
    title: "Breath Color Visualization",
    description: "Visualize inhaling colored light, exhaling different color. Combines visualization with breath.",
    category: "breath",
  },
  {
    id: 45,
    title: "Breath Temperature Awareness",
    description: "Notice temperature difference between inhale and exhale. Simple mindfulness technique.",
    category: "breath",
  },
  {
    id: 46,
    title: "Breath Elongation",
    description: "Gradually extend length of inhale and exhale. Builds lung capacity and breath control.",
    category: "breath",
  },
  {
    id: 47,
    title: "Breath Pause Awareness",
    description: "Notice natural pauses between breaths. Deepens meditation and breath awareness.",
    category: "breath",
  },
  {
    id: 48,
    title: "Breath Ratio Training",
    description: "Practice different inhale-hold-exhale-hold ratios. Customizes breath for different needs.",
    category: "breath",
  },
  {
    id: 49,
    title: "Breath Wave Visualization",
    description: "Visualize breath as wave flowing through body. Promotes relaxation and body awareness.",
    category: "breath",
  },
  {
    id: 50,
    title: "Breath Gratitude Practice",
    description: "Express gratitude for each breath. Combines gratitude practice with breath awareness.",
    category: "breath",
  },

  // MEDITATION ACTIVITIES (50)
  {
    id: 51,
    title: "Body Scan Meditation",
    description: "Lie down and mentally scan your body from head to toe, noticing sensations without judgment.",
    category: "meditation",
  },
  {
    id: 52,
    title: "Loving-Kindness Meditation",
    description: "Send positive wishes to yourself, loved ones, neutral people, and even difficult people.",
    category: "meditation",
  },
  {
    id: 53,
    title: "Mindfulness Meditation",
    description: "Focus on your breath, noticing thoughts as they arise without judgment, then return to breath.",
    category: "meditation",
  },
  {
    id: 54,
    title: "Visualization Meditation",
    description: "Imagine a peaceful scene in detail, engaging all senses to promote relaxation.",
    category: "meditation",
  },
  {
    id: 55,
    title: "Mantra Meditation",
    description: "Repeat a calming word or phrase (like 'peace' or 'om') to focus the mind and reduce stress.",
    category: "meditation",
  },
  {
    id: 56,
    title: "Walking Meditation",
    description: "Walk slowly and deliberately, focusing on each sensation of movement and breath.",
    category: "meditation",
  },
  {
    id: 57,
    title: "Chakra Meditation",
    description: "Focus attention on each energy center in the body, visualizing each with its associated color.",
    category: "meditation",
  },
  {
    id: 58,
    title: "Zen Meditation",
    description: "Sit in proper posture, focus on breath, observe thoughts without attachment.",
    category: "meditation",
  },
  {
    id: 59,
    title: "Transcendental Meditation",
    description: "Silently repeat a personalized mantra while sitting comfortably with eyes closed.",
    category: "meditation",
  },
  {
    id: 60,
    title: "Guided Meditation",
    description: "Follow along with recorded instructions to guide your meditation experience.",
    category: "meditation",
  },
  {
    id: 61,
    title: "Candle Gazing Meditation",
    description: "Focus gaze softly on candle flame, allowing mind to become absorbed in the light.",
    category: "meditation",
  },
  {
    id: 62,
    title: "Sound Bath Meditation",
    description: "Immerse yourself in healing sounds of singing bowls, gongs, or other instruments.",
    category: "meditation",
  },
  {
    id: 63,
    title: "Movement Meditation",
    description: "Practice gentle, mindful movements like tai chi or qigong with complete awareness.",
    category: "meditation",
  },
  {
    id: 64,
    title: "Compassion Meditation",
    description: "Cultivate feelings of compassion for suffering of self and others.",
    category: "meditation",
  },
  {
    id: 65,
    title: "Breath Awareness Meditation",
    description: "Focus entirely on natural rhythm of breath without attempting to control it.",
    category: "meditation",
  },
  {
    id: 66,
    title: "Empty Mind Meditation",
    description: "Attempt to clear all thoughts, returning to emptiness when thoughts arise.",
    category: "meditation",
  },
  {
    id: 67,
    title: "Third Eye Meditation",
    description: "Focus attention on space between eyebrows, the 'third eye' center of intuition.",
    category: "meditation",
  },
  {
    id: 68,
    title: "Heart-Centered Meditation",
    description: "Focus awareness on heart center, cultivating feelings of love and compassion.",
    category: "meditation",
  },
  {
    id: 69,
    title: "Five Senses Meditation",
    description: "Systematically notice what you're experiencing through each of your five senses.",
    category: "meditation",
  },
  {
    id: 70,
    title: "Gratitude Meditation",
    description: "Focus mind on things you're grateful for, allowing feelings of appreciation to grow.",
    category: "meditation",
  },
  {
    id: 71,
    title: "Forgiveness Meditation",
    description: "Practice forgiving yourself and others, releasing resentment and cultivating peace.",
    category: "meditation",
  },
  {
    id: 72,
    title: "Nature Meditation",
    description: "Meditate outdoors, connecting with natural elements and rhythms around you.",
    category: "meditation",
  },
  {
    id: 73,
    title: "Chocolate Meditation",
    description: "Mindfully eat a piece of chocolate, engaging all senses in the experience.",
    category: "meditation",
  },
  {
    id: 74,
    title: "Labyrinth Meditation",
    description: "Walk a labyrinth pattern slowly and mindfully as a moving meditation practice.",
    category: "meditation",
  },
  {
    id: 75,
    title: "Mindful Listening Meditation",
    description: "Focus completely on sounds around you without labeling or judging them.",
    category: "meditation",
  },
  {
    id: 76,
    title: "Yoga Nidra",
    description: "Practice 'yogic sleep,' a state of conscious deep relaxation while lying down.",
    category: "meditation",
  },
  {
    id: 77,
    title: "Trataka (Steady Gazing)",
    description: "Fix gaze on external object (like candle) then close eyes and visualize it internally.",
    category: "meditation",
  },
  {
    id: 78,
    title: "Self-Inquiry Meditation",
    description: "Ask yourself 'Who am I?' repeatedly, looking beyond surface answers.",
    category: "meditation",
  },
  {
    id: 79,
    title: "Vipassana Meditation",
    description: "Observe bodily sensations, developing insight into impermanent nature of experience.",
    category: "meditation",
  },
  {
    id: 80,
    title: "Tonglen Meditation",
    description: "Breathe in others' suffering, breathe out relief and compassion.",
    category: "meditation",
  },
  {
    id: 81,
    title: "Zazen Meditation",
    description: "Sit in proper posture, focus on breath, let thoughts pass without engagement.",
    category: "meditation",
  },
  {
    id: 82,
    title: "Metta Bhavana",
    description:
      "Systematically develop loving-kindness toward self, friend, neutral person, difficult person, all beings.",
    category: "meditation",
  },
  {
    id: 83,
    title: "Chakra Balancing Meditation",
    description: "Focus on each energy center sequentially, visualizing balance and alignment.",
    category: "meditation",
  },
  {
    id: 84,
    title: "Mindful Eating Meditation",
    description: "Eat a meal with complete attention to taste, texture, and sensations.",
    category: "meditation",
  },
  {
    id: 85,
    title: "Breath Counting Meditation",
    description: "Count each breath cycle from 1 to 10, then restart, maintaining focus.",
    category: "meditation",
  },
  {
    id: 86,
    title: "Mountain Meditation",
    description: "Visualize yourself as a mountain—solid, unchanging despite weather (emotions) passing by.",
    category: "meditation",
  },
  {
    id: 87,
    title: "Lake Meditation",
    description: "Visualize yourself as a lake—surface may have waves but depths remain calm.",
    category: "meditation",
  },
  {
    id: 88,
    title: "Sky Meditation",
    description: "Visualize thoughts as clouds passing through vast, unchanging sky of awareness.",
    category: "meditation",
  },
  {
    id: 89,
    title: "Mindful Showering",
    description: "Turn daily shower into meditation by focusing completely on sensations of water and cleaning.",
    category: "meditation",
  },
  {
    id: 90,
    title: "Mindful Tea Ceremony",
    description: "Prepare and drink tea with complete attention to each step and sensation.",
    category: "meditation",
  },
  {
    id: 91,
    title: "Noting Meditation",
    description: "Mentally label experiences as they arise: 'thinking,' 'feeling,' 'hearing,' etc.",
    category: "meditation",
  },
  {
    id: 92,
    title: "Contemplative Meditation",
    description: "Deeply reflect on a specific concept, quote, or teaching.",
    category: "meditation",
  },
  {
    id: 93,
    title: "Mindful Hand Meditation",
    description: "Focus complete attention on sensations in your hands for 5-10 minutes.",
    category: "meditation",
  },
  {
    id: 94,
    title: "Sunrise/Sunset Meditation",
    description: "Meditate while watching sunrise or sunset, connecting with natural transitions.",
    category: "meditation",
  },
  {
    id: 95,
    title: "Mindful Photography",
    description: "Take photos with complete presence, focusing on seeing clearly rather than results.",
    category: "meditation",
  },
  {
    id: 96,
    title: "Mindful Drawing",
    description: "Draw simple patterns or objects with complete attention to the process.",
    category: "meditation",
  },
  {
    id: 97,
    title: "Mindful Walking in Nature",
    description: "Walk in natural setting with full awareness of surroundings and sensations.",
    category: "meditation",
  },
  {
    id: 98,
    title: "Mindful Gardening",
    description: "Garden with complete presence, feeling earth, noticing plants' details.",
    category: "meditation",
  },
  {
    id: 99,
    title: "Mindful Cleaning",
    description: "Transform cleaning tasks into meditation by bringing full attention to each movement.",
    category: "meditation",
  },
  {
    id: 100,
    title: "Mindful Cooking",
    description: "Cook with full attention to smells, textures, sounds, and movements involved.",
    category: "meditation",
  },

  // GRATITUDE ACTIVITIES (50)
  {
    id: 101,
    title: "Gratitude Walk",
    description: "Take a 15-minute walk focusing only on things you're grateful for in your surroundings.",
    category: "gratitude",
  },
  {
    id: 102,
    title: "5-Minute Journal",
    description: "Write 3 things you're grateful for, 3 things that would make today great, and an affirmation.",
    category: "gratitude",
  },
  {
    id: 103,
    title: "Gratitude Letter",
    description: "Write a letter of thanks to someone who has positively impacted your life.",
    category: "gratitude",
  },
  {
    id: 104,
    title: "Gratitude Jar",
    description: "Write down one thing you're grateful for each day and place it in a jar to review later.",
    category: "gratitude",
  },
  {
    id: 105,
    title: "Gratitude Photography",
    description: "Take photos of things you appreciate throughout your day to create a visual gratitude journal.",
    category: "gratitude",
  },
  {
    id: 106,
    title: "Gratitude Meditation",
    description: "Meditate for 10 minutes focusing exclusively on things you're thankful for.",
    category: "gratitude",
  },
  {
    id: 107,
    title: "Three Good Things Practice",
    description: "Each night, write down three good things that happened and why they occurred.",
    category: "gratitude",
  },
  {
    id: 108,
    title: "Gratitude Visit",
    description: "Visit someone to personally thank them for their positive impact on your life.",
    category: "gratitude",
  },
  {
    id: 109,
    title: "Gratitude Stones",
    description: "Collect small stones, associate each with something you're grateful for, and carry one daily.",
    category: "gratitude",
  },
  {
    id: 110,
    title: "Gratitude Alarm",
    description: "Set random alarms throughout day as reminders to pause and find something to appreciate.",
    category: "gratitude",
  },
  {
    id: 111,
    title: "Gratitude Conversation",
    description: "Have a conversation focused solely on things you and others are grateful for.",
    category: "gratitude",
  },
  {
    id: 112,
    title: "Gratitude for Body Parts",
    description: "Express thanks for different parts of your body and what they enable you to do.",
    category: "gratitude",
  },
  {
    id: 113,
    title: "Gratitude for Challenges",
    description: "Identify difficulties you've faced and find aspects to be grateful for within them.",
    category: "gratitude",
  },
  {
    id: 114,
    title: "Gratitude for Nature",
    description: "Spend time outdoors noticing and appreciating elements of the natural world.",
    category: "gratitude",
  },
  {
    id: 115,
    title: "Gratitude for Technology",
    description: "Notice and appreciate how technology enhances your life in positive ways.",
    category: "gratitude",
  },
  {
    id: 116,
    title: "Gratitude for Food",
    description: "Before eating, take time to appreciate everyone involved in bringing food to your table.",
    category: "gratitude",
  },
  {
    id: 117,
    title: "Gratitude for Home",
    description: "Walk through your home noticing and appreciating aspects that provide comfort and security.",
    category: "gratitude",
  },
  {
    id: 118,
    title: "Gratitude for Mentors",
    description: "Reflect on people who have taught you important lessons and what you learned.",
    category: "gratitude",
  },
  {
    id: 119,
    title: "Gratitude for Skills",
    description: "List skills you possess and express appreciation for your ability to develop them.",
    category: "gratitude",
  },
  {
    id: 120,
    title: "Gratitude for Senses",
    description: "Focus on each of your five senses and identify things you're grateful to experience through them.",
    category: "gratitude",
  },
  {
    id: 121,
    title: "Gratitude Collage",
    description: "Create a visual collage of images representing things you're grateful for.",
    category: "gratitude",
  },
  {
    id: 122,
    title: "Gratitude Breathing",
    description: "With each inhale, think 'I am grateful for'; with each exhale, name something specific.",
    category: "gratitude",
  },
  {
    id: 123,
    title: "Gratitude for Strangers",
    description: "Notice helpful actions of strangers throughout your day and mentally thank them.",
    category: "gratitude",
  },
  {
    id: 124,
    title: "Gratitude for Learning",
    description: "Reflect on lessons learned from mistakes or failures and express gratitude for the growth.",
    category: "gratitude",
  },
  {
    id: 125,
    title: "Gratitude for Small Things",
    description: "Focus on noticing and appreciating tiny, often overlooked positive aspects of daily life.",
    category: "gratitude",
  },
  {
    id: 126,
    title: "Gratitude Partner",
    description: "Share three things you're grateful for with a friend or partner each day.",
    category: "gratitude",
  },
  {
    id: 127,
    title: "Gratitude for Work",
    description: "Identify aspects of your work or daily responsibilities that you can genuinely appreciate.",
    category: "gratitude",
  },
  {
    id: 128,
    title: "Gratitude for Health",
    description: "Appreciate aspects of your health and physical abilities, however small they may seem.",
    category: "gratitude",
  },
  {
    id: 129,
    title: "Gratitude for Emotions",
    description: "Recognize the value in all emotions, including difficult ones, and what they teach you.",
    category: "gratitude",
  },
  {
    id: 130,
    title: "Gratitude for Time",
    description: "Appreciate having time for activities that matter to you, however brief those moments may be.",
    category: "gratitude",
  },
  {
    id: 131,
    title: "Gratitude for Opportunities",
    description: "Reflect on opportunities you've been given and express appreciation for them.",
    category: "gratitude",
  },
  {
    id: 132,
    title: "Gratitude for Memories",
    description: "Recall positive memories and express thanks for experiences that created them.",
    category: "gratitude",
  },
  {
    id: 133,
    title: "Gratitude for Knowledge",
    description: "Appreciate information and wisdom you've gained throughout your life.",
    category: "gratitude",
  },
  {
    id: 134,
    title: "Gratitude for Creativity",
    description: "Express appreciation for creative expression in your life and others'.",
    category: "gratitude",
  },
  {
    id: 135,
    title: "Gratitude for Safety",
    description: "Acknowledge aspects of your life that provide security and protection.",
    category: "gratitude",
  },
  {
    id: 136,
    title: "Gratitude for Change",
    description: "Identify positive changes in your life and express appreciation for growth they've brought.",
    category: "gratitude",
  },
  {
    id: 137,
    title: "Gratitude for Stability",
    description: "Recognize and appreciate constants in your life that provide foundation and support.",
    category: "gratitude",
  },
  {
    id: 138,
    title: "Gratitude for Choices",
    description: "Reflect on freedom to make choices in your life and express appreciation for this ability.",
    category: "gratitude",
  },
  {
    id: 139,
    title: "Gratitude for Inspiration",
    description: "Identify sources of inspiration in your life and express thanks for their influence.",
    category: "gratitude",
  },
  {
    id: 140,
    title: "Gratitude for Laughter",
    description: "Recall moments of joy and humor, expressing appreciation for laughter in your life.",
    category: "gratitude",
  },
  {
    id: 141,
    title: "Gratitude for Pets",
    description: "If you have pets, spend time appreciating their presence and what they bring to your life.",
    category: "gratitude",
  },
  {
    id: 142,
    title: "Gratitude for Music",
    description: "Listen to music mindfully, appreciating how it enhances your life and emotions.",
    category: "gratitude",
  },
  {
    id: 143,
    title: "Gratitude for Books",
    description: "Express appreciation for books that have influenced your thinking and perspective.",
    category: "gratitude",
  },
  {
    id: 144,
    title: "Gratitude for Art",
    description: "Appreciate visual arts that move you emotionally and expand your perspective.",
    category: "gratitude",
  },
  {
    id: 145,
    title: "Gratitude for Seasons",
    description: "Notice and appreciate unique qualities of each season and what they bring to your life.",
    category: "gratitude",
  },
  {
    id: 146,
    title: "Gratitude for Rest",
    description: "Express appreciation for moments of rest and relaxation in your life.",
    category: "gratitude",
  },
  {
    id: 147,
    title: "Gratitude for Challenges Overcome",
    description: "Reflect on difficulties you've successfully navigated and what they taught you.",
    category: "gratitude",
  },
  {
    id: 148,
    title: "Gratitude for Teachers",
    description: "Remember teachers who positively influenced your development and what you learned from them.",
    category: "gratitude",
  },
  {
    id: 149,
    title: "Gratitude for Ancestors",
    description: "Acknowledge those who came before you and how their lives made yours possible.",
    category: "gratitude",
  },
  {
    id: 150,
    title: "Gratitude for Future Possibilities",
    description: "Appreciate opportunities that lie ahead and potential for positive experiences.",
    category: "gratitude",
  },

  // MINDFULNESS ACTIVITIES (50)
  {
    id: 151,
    title: "Mindful Eating",
    description: "Eat a meal without distractions, focusing on flavors, textures, and your body's signals.",
    category: "mindfulness",
  },
  {
    id: 152,
    title: "Sensory Awareness",
    description: "Focus on your five senses for 5 minutes, noting what you see, hear, feel, smell, and taste.",
    category: "mindfulness",
  },
  {
    id: 153,
    title: "Mindful Walking",
    description: "Walk slowly, paying attention to each step and the sensations in your feet and legs.",
    category: "mindfulness",
  },
  {
    id: 154,
    title: "STOP Practice",
    description: "Stop, Take a breath, Observe your thoughts and feelings, Proceed with awareness.",
    category: "mindfulness",
  },
  {
    id: 155,
    title: "Mindful Listening",
    description: "Listen to music or sounds in your environment with complete attention to detail.",
    category: "mindfulness",
  },
  {
    id: 156,
    title: "Body Scan",
    description: "Systematically bring awareness to each part of your body from head to toe.",
    category: "mindfulness",
  },
  {
    id: 157,
    title: "Mindful Breathing",
    description: "Focus complete attention on the physical sensations of breathing for 5-10 minutes.",
    category: "mindfulness",
  },
  {
    id: 158,
    title: "Mindful Observation",
    description: "Choose one natural object and observe it for 5 minutes as if seeing it for the first time.",
    category: "mindfulness",
  },
  {
    id: 159,
    title: "Mindful Awareness",
    description: "Throughout the day, pause and ask 'What is happening right now in my experience?'",
    category: "mindfulness",
  },
  {
    id: 160,
    title: "Mindful Showering",
    description: "Focus completely on sensations of water, soap, and movements during your shower.",
    category: "mindfulness",
  },
  {
    id: 161,
    title: "Mindful Tooth Brushing",
    description: "Bring full attention to the process of brushing your teeth, noticing all sensations.",
    category: "mindfulness",
  },
  {
    id: 162,
    title: "Mindful Hand Washing",
    description: "Wash hands with complete attention to sensations of water, soap, and movements.",
    category: "mindfulness",
  },
  {
    id: 163,
    title: "Mindful Stretching",
    description: "Perform gentle stretches with full awareness of bodily sensations and breath.",
    category: "mindfulness",
  },
  {
    id: 164,
    title: "Mindful Waiting",
    description: "When waiting in line or traffic, use the time to practice present moment awareness.",
    category: "mindfulness",
  },
  {
    id: 165,
    title: "Mindful Technology Use",
    description: "Use devices with intention and awareness, noticing effects on your mind and body.",
    category: "mindfulness",
  },
  {
    id: 166,
    title: "Mindful Communication",
    description: "Listen and speak with full attention, noticing thoughts and feelings that arise.",
    category: "mindfulness",
  },
  {
    id: 167,
    title: "Mindful Cooking",
    description: "Prepare food with full attention to smells, textures, sounds, and movements.",
    category: "mindfulness",
  },
  {
    id: 168,
    title: "Mindful Cleaning",
    description: "Clean your space with complete presence, noticing movements, smells, and transformations.",
    category: "mindfulness",
  },
  {
    id: 169,
    title: "Mindful Driving",
    description: "Drive with full awareness of the vehicle, road, surroundings, and your own reactions.",
    category: "mindfulness",
  },
  {
    id: 170,
    title: "Mindful Reading",
    description: "Read slowly, absorbing each word and noticing when mind wanders from the text.",
    category: "mindfulness",
  },
  {
    id: 171,
    title: "Mindful Listening to Others",
    description: "Listen to someone speak without planning your response, giving them full attention.",
    category: "mindfulness",
  },
  {
    id: 172,
    title: "Mindful Posture Check",
    description: "Set reminders to check and adjust your posture throughout the day with awareness.",
    category: "mindfulness",
  },
  {
    id: 173,
    title: "Mindful Commuting",
    description: "Use your daily commute as an opportunity for awareness rather than distraction.",
    category: "mindfulness",
  },
  {
    id: 174,
    title: "Mindful Drinking",
    description: "Drink water or tea with full attention to temperature, taste, and sensations.",
    category: "mindfulness",
  },
  {
    id: 175,
    title: "Mindful Gardening",
    description: "Garden with complete presence, feeling earth, noticing plants' details.",
    category: "mindfulness",
  },
  {
    id: 176,
    title: "Mindful Photography",
    description: "Take photos with complete presence, focusing on seeing clearly rather than results.",
    category: "mindfulness",
  },
  {
    id: 177,
    title: "Mindful Drawing",
    description: "Draw simple patterns or objects with complete attention to the process.",
    category: "mindfulness",
  },
  {
    id: 178,
    title: "Mindful Journaling",
    description: "Write about your present moment experience, noticing thoughts and sensations as they arise.",
    category: "mindfulness",
  },
  {
    id: 179,
    title: "Mindful Transition",
    description: "Pause briefly between activities to notice the transition from one task to another.",
    category: "mindfulness",
  },
  {
    id: 180,
    title: "Mindful Appreciation",
    description: "Notice five things you typically take for granted and appreciate their value.",
    category: "mindfulness",
  },
  {
    id: 181,
    title: "Mindful Check-in",
    description: "Pause several times daily to notice your thoughts, emotions, and bodily sensations.",
    category: "mindfulness",
  },
  {
    id: 182,
    title: "Mindful Workspace",
    description: "Arrange your workspace with intention, noticing effects of environment on your mind.",
    category: "mindfulness",
  },
  {
    id: 183,
    title: "Mindful Conversation",
    description: "Have a conversation with complete presence, noticing when mind wanders from listening.",
    category: "mindfulness",
  },
  {
    id: 184,
    title: "Mindful Movement",
    description: "Move slowly and deliberately, noticing all sensations associated with physical movement.",
    category: "mindfulness",
  },
  {
    id: 185,
    title: "Mindful Awakening",
    description: "When you first wake up, take a few minutes to notice sensations before starting your day.",
    category: "mindfulness",
  },
  {
    id: 186,
    title: "Mindful Bedtime",
    description: "Create a mindful routine before sleep, paying attention to preparing for rest.",
    category: "mindfulness",
  },
  {
    id: 187,
    title: "Mindful Touch",
    description: "Focus on physical sensations when touching different textures and materials.",
    category: "mindfulness",
  },
  {
    id: 188,
    title: "Mindful Seeing",
    description: "Look out a window for 5 minutes, noticing details as if seeing for the first time.",
    category: "mindfulness",
  },
  {
    id: 189,
    title: "Mindful Hearing",
    description: "Close eyes and focus exclusively on sounds around you for 5 minutes without judgment.",
    category: "mindfulness",
  },
  {
    id: 190,
    title: "Mindful Smelling",
    description: "Focus exclusively on scents around you or of specific items, noticing subtleties.",
    category: "mindfulness",
  },
  {
    id: 191,
    title: "Mindful Tasting",
    description: "Place a small piece of food on tongue, noticing all aspects of taste before chewing.",
    category: "mindfulness",
  },
  {
    id: 192,
    title: "Mindful Decision Making",
    description: "Notice thoughts, emotions, and bodily sensations that arise when making decisions.",
    category: "mindfulness",
  },
  {
    id: 193,
    title: "Mindful Digital Detox",
    description: "Designate time periods to disconnect from devices and notice effects on your awareness.",
    category: "mindfulness",
  },
  {
    id: 194,
    title: "Mindful Emotional Awareness",
    description: "When emotions arise, pause to notice physical sensations, thoughts, and urges associated with them.",
    category: "mindfulness",
  },
  {
    id: 195,
    title: "Mindful Gratitude",
    description: "Notice things you're grateful for with full presence rather than just listing them.",
    category: "mindfulness",
  },
  {
    id: 196,
    title: "Mindful Pause",
    description: "Take three conscious breaths before responding in conversations or stressful situations.",
    category: "mindfulness",
  },
  {
    id: 197,
    title: "Mindful Intention Setting",
    description: "Begin each day by mindfully setting an intention for how you wish to be present.",
    category: "mindfulness",
  },
  {
    id: 198,
    title: "Mindful Review",
    description: "End each day by mindfully reviewing events without judgment or elaboration.",
    category: "mindfulness",
  },
  {
    id: 199,
    title: "Mindful Acceptance",
    description: "Practice accepting current experience as it is, noticing resistance when it arises.",
    category: "mindfulness",
  },
  {
    id: 200,
    title: "Mindful Self-Compassion",
    description: "Notice self-critical thoughts and respond with kindness as you would to a friend.",
    category: "mindfulness",
  },

  // MOOD ACTIVITIES (50)
  {
    id: 201,
    title: "Mood Tracking",
    description: "Record your mood at different times of day to identify patterns and triggers.",
    category: "mood",
  },
  {
    id: 202,
    title: "Positive Memory Recall",
    description: "Spend 5 minutes vividly recalling a positive memory to improve your current mood.",
    category: "mood",
  },
  {
    id: 203,
    title: "Laughter Practice",
    description: "Watch or read something funny for 10 minutes to boost endorphins and improve mood.",
    category: "mood",
  },
  {
    id: 204,
    title: "Color Therapy",
    description: "Spend time with colors that boost your mood - blue for calm, yellow for happiness, etc.",
    category: "mood",
  },
  {
    id: 205,
    title: "Mood-Boosting Playlist",
    description: "Create and listen to a playlist of songs that elevate your mood and energy.",
    category: "mood",
  },
  {
    id: 206,
    title: "Mood-Lifting Movement",
    description: "Do 5-10 minutes of movement that makes you feel good - dancing, stretching, walking.",
    category: "mood",
  },
  {
    id: 207,
    title: "Mood Journal",
    description: "Write about your current emotional state and factors that might be influencing it.",
    category: "mood",
  },
  {
    id: 208,
    title: "Mood Board Creation",
    description: "Create a digital or physical collage of images that inspire positive feelings.",
    category: "mood",
  },
  {
    id: 209,
    title: "Emotional Weather Report",
    description: "Describe your current emotional state as a weather report, acknowledging it will change.",
    category: "mood",
  },
  {
    id: 210,
    title: "Mood-Boosting Scents",
    description: "Use aromatherapy with scents like citrus, lavender, or peppermint to influence mood.",
    category: "mood",
  },
  {
    id: 211,
    title: "Emotional Acceptance",
    description: "Practice accepting current emotions without judgment, knowing they are temporary.",
    category: "mood",
  },
  {
    id: 212,
    title: "Mood-Lifting Stretches",
    description: "Do gentle stretches that open the chest and improve posture to positively affect mood.",
    category: "mood",
  },
  {
    id: 213,
    title: "Emotional Labeling",
    description: "Name your emotions specifically (beyond just 'good' or 'bad') to increase emotional intelligence.",
    category: "mood",
  },
  {
    id: 214,
    title: "Mood and Food Awareness",
    description: "Notice how different foods affect your mood and energy levels throughout the day.",
    category: "mood",
  },
  {
    id: 215,
    title: "Positive Affirmations",
    description: "Repeat personally meaningful positive statements to shift thought patterns and mood.",
    category: "mood",
  },
  {
    id: 216,
    title: "Emotional Body Scan",
    description: "Check in with your body to notice where you might be holding emotional tension.",
    category: "mood",
  },
  {
    id: 217,
    title: "Mood-Boosting Environment",
    description: "Make small changes to your environment that positively impact your mood and energy.",
    category: "mood",
  },
  {
    id: 218,
    title: "Emotional Support Connection",
    description: "Reach out to someone who provides emotional support when you need mood regulation.",
    category: "mood",
  },
  {
    id: 219,
    title: "Mood-Lifting Visualization",
    description: "Visualize yourself in a place or situation that brings feelings of peace or joy.",
    category: "mood",
  },
  {
    id: 220,
    title: "Emotional Needs Assessment",
    description: "Ask yourself what emotional need might be behind a difficult mood and how to address it.",
    category: "mood",
  },
  {
    id: 221,
    title: "Mood-Boosting Hydration",
    description: "Notice how hydration levels affect your mood and energy throughout the day.",
    category: "mood",
  },
  {
    id: 222,
    title: "Emotional Resilience Reflection",
    description: "Recall past challenges you've overcome to build confidence in managing current emotions.",
    category: "mood",
  },
  {
    id: 223,
    title: "Mood and Sleep Connection",
    description: "Track how sleep quality affects your emotional state to improve sleep hygiene.",
    category: "mood",
  },
  {
    id: 224,
    title: "Emotional Expression Through Art",
    description: "Use drawing, painting, or other art forms to express and process current emotions.",
    category: "mood",
  },
  {
    id: 225,
    title: "Mood-Lifting Physical Touch",
    description: "Use self-massage, hugging a pet, or embracing a loved one to release oxytocin.",
    category: "mood",
  },
  {
    id: 226,
    title: "Emotional Triggers Identification",
    description: "Identify specific situations, thoughts, or behaviors that trigger mood changes.",
    category: "mood",
  },
  {
    id: 227,
    title: "Mood-Boosting Sunlight",
    description: "Spend 10-15 minutes in natural sunlight to boost vitamin D and serotonin levels.",
    category: "mood",
  },
  {
    id: 228,
    title: "Emotional Regulation Breathing",
    description: "Practice specific breathing patterns that help regulate your nervous system and mood.",
    category: "mood",
  },
  {
    id: 229,
    title: "Mood-Lifting Accomplishment",
    description: "Complete a small, manageable task to experience sense of accomplishment and improved mood.",
    category: "mood",
  },
  {
    id: 230,
    title: "Emotional Vocabulary Expansion",
    description: "Learn new words to describe emotional states to increase emotional granularity.",
    category: "mood",
  },
  {
    id: 231,
    title: "Mood and Movement Connection",
    description: "Notice how different types of movement affect your emotional state throughout the day.",
    category: "mood",
  },
  {
    id: 232,
    title: "Emotional First Aid Kit",
    description: "Create a collection of items, activities, and reminders that help during difficult moods.",
    category: "mood",
  },
  {
    id: 233,
    title: "Mood-Boosting Nature Connection",
    description: "Spend time in natural settings that elevate your mood and reduce stress.",
    category: "mood",
  },
  {
    id: 234,
    title: "Emotional Boundaries Practice",
    description: "Identify and communicate boundaries that protect your emotional wellbeing.",
    category: "mood",
  },
  {
    id: 235,
    title: "Mood-Lifting Acts of Kindness",
    description: "Perform small acts of kindness for others, which research shows improves your own mood.",
    category: "mood",
  },
  {
    id: 236,
    title: "Emotional Awareness Meditation",
    description: "Meditate with focus on observing emotions as they arise and pass without attachment.",
    category: "mood",
  },
  {
    id: 237,
    title: "Mood and Digital Consumption",
    description: "Notice how different types of digital content affect your emotional state and energy.",
    category: "mood",
  },
  {
    id: 238,
    title: "Emotional Reframing",
    description: "Practice looking at challenging situations from different perspectives to shift emotional response.",
    category: "mood",
  },
  {
    id: 239,
    title: "Mood-Boosting Cold Exposure",
    description: "Brief cold exposure (shower, splash face) to trigger endorphins and improve alertness.",
    category: "mood",
  },
  {
    id: 240,
    title: "Emotional Intelligence Building",
    description: "Read or learn about emotions to better understand and manage your emotional life.",
    category: "mood",
  },
  {
    id: 241,
    title: "Mood-Lifting Decluttering",
    description: "Clear physical space to create sense of order and calm in your mental space.",
    category: "mood",
  },
  {
    id: 242,
    title: "Emotional Support Animals",
    description: "Spend time with pets or animals, which research shows can regulate mood and reduce stress.",
    category: "mood",
  },
  {
    id: 243,
    title: "Mood and Posture Connection",
    description: "Notice how your physical posture affects and reflects your emotional state.",
    category: "mood",
  },
  {
    id: 244,
    title: "Emotional Release Through Movement",
    description: "Use movement specifically to release emotional energy stored in the body.",
    category: "mood",
  },
  {
    id: 245,
    title: "Mood-Boosting Routine",
    description: "Create morning or evening routines that support emotional regulation and positive mood.",
    category: "mood",
  },
  {
    id: 246,
    title: "Emotional Honesty Practice",
    description: "Practice honestly acknowledging your true feelings to yourself and trusted others.",
    category: "mood",
  },
  {
    id: 247,
    title: "Mood-Lifting Creativity",
    description: "Engage in creative activities that bring joy and flow, improving emotional state.",
    category: "mood",
  },
  {
    id: 248,
    title: "Emotional Grounding Techniques",
    description: "Use sensory awareness to ground yourself when emotions feel overwhelming.",
    category: "mood",
  },
  {
    id: 249,
    title: "Mood and Social Connection",
    description: "Notice how different social interactions affect your emotional wellbeing.",
    category: "mood",
  },
  {
    id: 250,
    title: "Emotional Weather Forecast",
    description: "Anticipate potentially challenging emotional situations and plan supportive strategies.",
    category: "mood",
  },

  // NATURE ACTIVITIES (50)
  {
    id: 251,
    title: "Forest Bathing",
    description: "Spend time in a forest or wooded area, using all senses to connect with nature.",
    category: "nature",
  },
  {
    id: 252,
    title: "Earthing",
    description: "Walk barefoot on grass, sand, or soil for 10-20 minutes to connect with the earth.",
    category: "nature",
  },
  {
    id: 253,
    title: "Nature Sounds Meditation",
    description: "Listen to recordings of nature sounds (or actual nature) while meditating.",
    category: "nature",
  },
  {
    id: 254,
    title: "Plant Care Ritual",
    description: "Mindfully tend to houseplants or garden, focusing on nurturing living things.",
    category: "nature",
  },
  {
    id: 255,
    title: "Cloud Watching",
    description: "Lie on your back and observe cloud formations, letting your mind wander peacefully.",
    category: "nature",
  },
  {
    id: 256,
    title: "Nature Scavenger Hunt",
    description: "Search for specific items in nature like certain leaves, stones, or wildlife.",
    category: "nature",
  },
  {
    id: 257,
    title: "Sunrise/Sunset Observation",
    description: "Mindfully watch the sun rise or set, paying attention to changing colors and feelings.",
    category: "nature",
  },
  {
    id: 258,
    title: "Bird Watching",
    description: "Observe birds in their natural habitat, noticing behaviors, sounds, and patterns.",
    category: "nature",
  },
  {
    id: 259,
    title: "Nature Photography",
    description: "Take photos of natural elements that catch your attention, focusing on details.",
    category: "nature",
  },
  {
    id: 260,
    title: "Rock Stacking",
    description: "Mindfully stack rocks or stones in a balanced formation, practicing presence and patience.",
    category: "nature",
  },
  {
    id: 261,
    title: "Nature Journaling",
    description: "Write or sketch observations about natural surroundings, focusing on details and feelings.",
    category: "nature",
  },
  {
    id: 262,
    title: "Star Gazing",
    description: "Observe the night sky, noticing stars, planets, and your place in the universe.",
    category: "nature",
  },
  {
    id: 263,
    title: "Water Watching",
    description: "Sit beside a body of water (stream, lake, ocean) and observe its movements and sounds.",
    category: "nature",
  },
  {
    id: 264,
    title: "Nature Mandala Creation",
    description: "Arrange natural items like leaves, stones, and flowers in circular patterns.",
    category: "nature",
  },
  {
    id: 265,
    title: "Tree Meditation",
    description: "Sit or stand with back against a tree, feeling connection and support from its presence.",
    category: "nature",
  },
  {
    id: 266,
    title: "Seasonal Awareness",
    description: "Notice specific signs of the current season, appreciating nature's cycles.",
    category: "nature",
  },
  {
    id: 267,
    title: "Nature Sound Mapping",
    description: "Close eyes and identify all the different natural sounds you can hear around you.",
    category: "nature",
  },
  {
    id: 268,
    title: "Mindful Hiking",
    description: "Hike with full attention to surroundings, sensations, and present experience.",
    category: "nature",
  },
  {
    id: 269,
    title: "Plant Identification",
    description: "Learn to identify local plants and trees, building connection with your environment.",
    category: "nature",
  },
  {
    id: 270,
    title: "Moon Phase Observation",
    description: "Track the moon's phases over time, connecting with natural cycles.",
    category: "nature",
  },
  {
    id: 271,
    title: "Nature Texture Exploration",
    description: "Touch different natural textures (bark, stones, leaves) with mindful awareness.",
    category: "nature",
  },
  {
    id: 272,
    title: "Weather Appreciation",
    description: "Mindfully experience different weather conditions without judgment.",
    category: "nature",
  },
  {
    id: 273,
    title: "Seed Planting Ritual",
    description: "Plant seeds with intention, connecting with cycles of growth and renewal.",
    category: "nature",
  },
  {
    id: 274,
    title: "Nature Color Palette",
    description: "Identify and appreciate the range of colors present in a natural setting.",
    category: "nature",
  },
  {
    id: 275,
    title: "Insect Observation",
    description: "Closely and non-judgmentally observe insects going about their activities.",
    category: "nature",
  },
  {
    id: 276,
    title: "Nature Breathing",
    description: "Synchronize breath with natural rhythms like waves or wind in trees.",
    category: "nature",
  },
  {
    id: 277,
    title: "Foraging Walk",
    description: "Learn about and respectfully gather edible plants, connecting with traditional knowledge.",
    category: "nature",
  },
  {
    id: 278,
    title: "Nature Sketching",
    description: "Draw elements of nature, focusing on observation rather than artistic outcome.",
    category: "nature",
  },
  {
    id: 279,
    title: "Ecological Volunteering",
    description: "Participate in conservation efforts like beach cleanups or tree planting.",
    category: "nature",
  },
  {
    id: 280,
    title: "Dawn Chorus Listening",
    description: "Wake early to hear birds' morning songs, a natural symphony at daybreak.",
    category: "nature",
  },
  {
    id: 281,
    title: "Nature-Inspired Creativity",
    description: "Create art or writing inspired by natural elements you've observed.",
    category: "nature",
  },
  {
    id: 282,
    title: "Wildlife Tracking",
    description: "Look for and follow animal tracks, learning about local wildlife movements.",
    category: "nature",
  },
  {
    id: 283,
    title: "Seasonal Foraging",
    description: "Gather seasonal natural items like pinecones, acorns, or shells with mindfulness.",
    category: "nature",
  },
  {
    id: 284,
    title: "Nature Immersion Day",
    description: "Spend a full day outdoors with minimal technology, fully present in nature.",
    category: "nature",
  },
  {
    id: 285,
    title: "Mindful Gardening",
    description: "Tend to plants with full attention to sensations, growth processes, and changes.",
    category: "nature",
  },
  {
    id: 286,
    title: "Nature Sound Recording",
    description: "Record natural sounds to create a personal library of calming nature audio.",
    category: "nature",
  },
  {
    id: 287,
    title: "Leaf Meditation",
    description: "Examine a single leaf in great detail, noticing patterns, colors, and textures.",
    category: "nature",
  },
  {
    id: 288,
    title: "Nature Movement Practice",
    description: "Practice yoga, tai chi, or free movement outdoors, connecting with natural surroundings.",
    category: "nature",
  },
  {
    id: 289,
    title: "Seasonal Eating",
    description: "Eat foods currently in season locally, connecting with natural growth cycles.",
    category: "nature",
  },
  {
    id: 290,
    title: "Nature Window Gazing",
    description: "If unable to go outside, spend time mindfully observing nature through a window.",
    category: "nature",
  },
  {
    id: 291,
    title: "Wilderness Solitude",
    description: "Spend time alone in nature, experiencing the unique quality of natural silence.",
    category: "nature",
  },
  {
    id: 292,
    title: "Natural Materials Crafting",
    description: "Create simple crafts using only materials found in nature.",
    category: "nature",
  },
  {
    id: 293,
    title: "Nature-Based Meditation",
    description: "Use natural elements (stone, leaf, water) as focus objects for meditation.",
    category: "nature",
  },
  {
    id: 294,
    title: "Ecological Learning",
    description: "Study local ecosystems to deepen understanding and connection with natural world.",
    category: "nature",
  },
  {
    id: 295,
    title: "Nature Appreciation Journal",
    description: "Keep a journal specifically for recording moments of connection with nature.",
    category: "nature",
  },
  {
    id: 296,
    title: "Mindful Swimming",
    description: "Swim in natural water (if safe), fully experiencing sensations and movements.",
    category: "nature",
  },
  {
    id: 297,
    title: "Wildlife Observation",
    description: "Observe animals in their natural habitat, noticing behaviors and interactions.",
    category: "nature",
  },
  {
    id: 298,
    title: "Nature Art Creation",
    description: "Create art using natural materials like leaves, twigs, and stones.",
    category: "nature",
  },
  {
    id: 299,
    title: "Nature-Inspired Writing",
    description: "Write poetry or prose inspired by your experiences in nature.",
    category: "nature",
  },
  {
    id: 300,
    title: "Nature Gratitude Walk",
    description: "Take a walk in nature and focus on things you're grateful for in your surroundings.",
    category: "nature",
  },

  // SELF-AWARENESS ACTIVITIES (50)
  {
    id: 301,
    title: "Thought Observation",
    description: "Sit quietly and observe your thoughts without judgment, noticing patterns and themes.",
    category: "self-awareness",
  },
  {
    id: 302,
    title: "Emotion Check-In",
    description: "Pause and identify what emotion you're feeling right now and where you feel it in your body.",
    category: "self-awareness",
  },
  {
    id: 303,
    title: "Values Reflection",
    description: "Reflect on your core values and whether your current actions align with them.",
    category: "self-awareness",
  },
  {
    id: 304,
    title: "Trigger Identification",
    description: "Notice what situations, people, or thoughts trigger strong emotional reactions in you.",
    category: "self-awareness",
  },
  {
    id: 305,
    title: "Body Sensation Mapping",
    description: "Scan your body and map where you feel different emotions physically.",
    category: "self-awareness",
  },
  {
    id: 306,
    title: "Thought Journaling",
    description: "Write down your thoughts without editing, then review for patterns and beliefs.",
    category: "self-awareness",
  },
  {
    id: 307,
    title: "Habit Awareness",
    description: "Track one habit for a day, noting triggers, behaviors, and rewards associated with it.",
    category: "self-awareness",
  },
  {
    id: 308,
    title: "Self-Talk Observation",
    description: "Pay attention to your inner dialogue for an hour, noting tone and content.",
    category: "self-awareness",
  },
  {
    id: 309,
    title: "Needs Assessment",
    description: "Ask yourself what you need right now - physically, emotionally, mentally, and spiritually.",
    category: "self-awareness",
  },
  {
    id: 310,
    title: "Personal Boundaries Check",
    description: "Reflect on your boundaries in different relationships and whether they're being respected.",
    category: "self-awareness",
  },
  {
    id: 311,
    title: "Energy Audit",
    description: "Notice what activities, people, and environments drain or energize you throughout the day.",
    category: "self-awareness",
  },
  {
    id: 312,
    title: "Limiting Belief Identification",
    description: "Identify one belief that's limiting your growth and question its validity.",
    category: "self-awareness",
  },
  {
    id: 313,
    title: "Strength Recognition",
    description: "Identify three personal strengths you've demonstrated recently and how you used them.",
    category: "self-awareness",
  },
  {
    id: 314,
    title: "Growth Area Identification",
    description: "Compassionately identify one area where you'd like to grow and why it matters to you.",
    category: "self-awareness",
  },
  {
    id: 315,
    title: "Reaction Observation",
    description: "When triggered, pause to observe your reaction before responding.",
    category: "self-awareness",
  },
  {
    id: 316,
    title: "Love Language Reflection",
    description: "Reflect on how you prefer to give and receive love and appreciation.",
    category: "self-awareness",
  },
  {
    id: 317,
    title: "Decision-Making Process Awareness",
    description: "Notice how you make decisions - logically, intuitively, or based on feelings.",
    category: "self-awareness",
  },
  {
    id: 318,
    title: "Conflict Response Pattern",
    description: "Reflect on your typical response to conflict - avoidance, accommodation, competition, etc.",
    category: "self-awareness",
  },
  {
    id: 319,
    title: "Personal Values Clarification",
    description: "List your top 5 values and rate how well your current life expresses each one.",
    category: "self-awareness",
  },
  {
    id: 320,
    title: "Stress Response Awareness",
    description: "Notice your physical, emotional, and mental responses when you feel stressed.",
    category: "self-awareness",
  },
  {
    id: 321,
    title: "Judgment Awareness",
    description: "Notice when you judge yourself or others and pause to investigate the underlying beliefs.",
    category: "self-awareness",
  },
  {
    id: 322,
    title: "Emotional Needs Identification",
    description: "Identify what emotional needs you're seeking to meet with specific behaviors.",
    category: "self-awareness",
  },
  {
    id: 323,
    title: "Personality Reflection",
    description: "Reflect on aspects of your personality and how they influence your interactions.",
    category: "self-awareness",
  },
  {
    id: 324,
    title: "Attachment Style Awareness",
    description: "Learn about attachment styles and reflect on your patterns in close relationships.",
    category: "self-awareness",
  },
  {
    id: 325,
    title: "Projection Recognition",
    description: "Notice when you might be projecting your own traits onto others.",
    category: "self-awareness",
  },
  {
    id: 326,
    title: "Resistance Awareness",
    description: "Notice when you feel resistance to something and explore what's behind it.",
    category: "self-awareness",
  },
  {
    id: 327,
    title: "Comfort Zone Mapping",
    description: "Identify areas of life where you stay in your comfort zone and why.",
    category: "self-awareness",
  },
  {
    id: 328,
    title: "Motivation Exploration",
    description: "Examine what truly motivates you in different areas of your life.",
    category: "self-awareness",
  },
  {
    id: 329,
    title: "Fear Inventory",
    description: "List your fears and reflect on how they influence your choices.",
    category: "self-awareness",
  },
  {
    id: 330,
    title: "Success Definition",
    description: "Define what success means to you personally, beyond societal definitions.",
    category: "self-awareness",
  },
  {
    id: 331,
    title: "Envy Exploration",
    description: "Notice when you feel envy and what it might reveal about your desires.",
    category: "self-awareness",
  },
  {
    id: 332,
    title: "Happiness Inventory",
    description: "List activities, people, and environments that genuinely make you happy.",
    category: "self-awareness",
  },
  {
    id: 333,
    title: "Authenticity Check",
    description: "Reflect on situations where you feel most and least authentic.",
    category: "self-awareness",
  },
  {
    id: 334,
    title: "Life Roles Reflection",
    description: "List all your life roles and how you feel about each one.",
    category: "self-awareness",
  },
  {
    id: 335,
    title: "Personal Narrative Awareness",
    description: "Notice the stories you tell yourself about who you are and your life.",
    category: "self-awareness",
  },
  {
    id: 336,
    title: "Emotional Regulation Assessment",
    description: "Reflect on how you typically regulate different emotions.",
    category: "self-awareness",
  },
  {
    id: 337,
    title: "Comparison Tendency",
    description: "Notice when you compare yourself to others and how it affects you.",
    category: "self-awareness",
  },
  {
    id: 338,
    title: "Perfectionism Recognition",
    description: "Identify areas where perfectionism might be limiting your wellbeing.",
    category: "self-awareness",
  },
  {
    id: 339,
    title: "Procrastination Pattern",
    description: "Notice when and why you procrastinate on certain tasks.",
    category: "self-awareness",
  },
  {
    id: 340,
    title: "Relationship Pattern Recognition",
    description: "Reflect on patterns in your close relationships over time.",
    category: "self-awareness",
  },
  {
    id: 341,
    title: "Gratitude Resistance",
    description: "Notice when you resist feeling grateful and what beliefs might be behind it.",
    category: "self-awareness",
  },
  {
    id: 342,
    title: "Pleasure Inventory",
    description: "List simple pleasures that bring you joy and how often you experience them.",
    category: "self-awareness",
  },
  {
    id: 343,
    title: "Resentment Awareness",
    description: "Notice feelings of resentment and what unmet needs they might indicate.",
    category: "self-awareness",
  },
  {
    id: 344,
    title: "Self-Compassion Assessment",
    description: "Reflect on how you treat yourself when you struggle or make mistakes.",
    category: "self-awareness",
  },
  {
    id: 345,
    title: "Approval-Seeking Behavior",
    description: "Notice when you seek approval from others and what drives this need.",
    category: "self-awareness",
  },
  {
    id: 346,
    title: "Personal Integrity Check",
    description: "Reflect on alignment between your values, words, and actions.",
    category: "self-awareness",
  },
  {
    id: 347,
    title: "Emotional Inheritance Reflection",
    description: "Consider emotional patterns you may have inherited from your family.",
    category: "self-awareness",
  },
  {
    id: 348,
    title: "Intuition Awareness",
    description: "Notice when your intuition speaks to you and how it communicates.",
    category: "self-awareness",
  },
  {
    id: 349,
    title: "Life Purpose Contemplation",
    description: "Reflect on what gives your life meaning and purpose.",
    category: "self-awareness",
  },
  {
    id: 350,
    title: "Shadow Work",
    description: "Explore aspects of yourself that you typically hide or deny.",
    category: "self-awareness",
  },

  // EXERCISE ACTIVITIES (50)
  {
    id: 351,
    title: "Mindful Walking",
    description: "Walk slowly and deliberately, focusing on each step and breath.",
    category: "exercise",
  },
  {
    id: 352,
    title: "Gentle Morning Stretch",
    description: "Perform 5-10 minutes of gentle full-body stretches upon waking.",
    category: "exercise",
  },
  {
    id: 353,
    title: "Desk Yoga",
    description: "Simple yoga poses you can do at your desk to relieve tension.",
    category: "exercise",
  },
  {
    id: 354,
    title: "Mindful Strength Training",
    description: "Perform strength exercises with complete focus on muscle engagement and breath.",
    category: "exercise",
  },
  {
    id: 355,
    title: "Walking Meditation",
    description: "Combine walking with meditation, focusing on each step and breath.",
    category: "exercise",
  },
  {
    id: 356,
    title: "Tai Chi Practice",
    description: "Learn and practice basic tai chi movements for mind-body connection.",
    category: "exercise",
  },
  {
    id: 357,
    title: "Qigong Flow",
    description: "Practice qigong movements to balance energy and promote wellbeing.",
    category: "exercise",
  },
  {
    id: 358,
    title: "Yoga Sun Salutation",
    description: "Perform a sequence of yoga poses that flow with the breath.",
    category: "exercise",
  },
  {
    id: 359,
    title: "Five Tibetan Rites",
    description: "Practice these five simple exercises daily for energy and vitality.",
    category: "exercise",
  },
  {
    id: 360,
    title: "Mindful Running",
    description: "Run with awareness of breath, footfalls, and bodily sensations.",
    category: "exercise",
  },
  {
    id: 361,
    title: "Dance Meditation",
    description: "Move freely to music, expressing emotions through spontaneous movement.",
    category: "exercise",
  },
  {
    id: 362,
    title: "Balance Practice",
    description: "Spend 5 minutes practicing standing on one leg, then the other.",
    category: "exercise",
  },
  {
    id: 363,
    title: "Mindful Swimming",
    description: "Swim with full awareness of each stroke, breath, and bodily sensation.",
    category: "exercise",
  },
  {
    id: 364,
    title: "Joint Mobility Routine",
    description: "Gently move each joint through its full range of motion.",
    category: "exercise",
  },
  {
    id: 365,
    title: "Breath-Synchronized Movement",
    description: "Coordinate simple movements with inhales and exhales.",
    category: "exercise",
  },
  {
    id: 366,
    title: "Isometric Exercises",
    description: "Practice muscle engagement without movement, focusing on sensation.",
    category: "exercise",
  },
  {
    id: 367,
    title: "Mindful Cooldown",
    description: "After exercise, cool down with slow, mindful movements and deep breathing.",
    category: "exercise",
  },
  {
    id: 368,
    title: "Nature Movement",
    description: "Exercise outdoors, connecting movement with natural surroundings.",
    category: "exercise",
  },
  {
    id: 369,
    title: "Barefoot Walking",
    description: "Walk barefoot on different surfaces, noticing sensations in your feet.",
    category: "exercise",
  },
  {
    id: 370,
    title: "Posture Reset",
    description: "Practice exercises specifically designed to improve posture and alignment.",
    category: "exercise",
  },
  {
    id: 371,
    title: "Mindful Resistance Training",
    description: "Use resistance bands or weights with full attention to form and sensation.",
    category: "exercise",
  },
  {
    id: 372,
    title: "Pilates Core Focus",
    description: "Practice Pilates exercises with emphasis on core engagement and breath.",
    category: "exercise",
  },
  {
    id: 373,
    title: "Mindful Flexibility Training",
    description: "Practice stretches with focus on breath and sensation, not pushing limits.",
    category: "exercise",
  },
  {
    id: 374,
    title: "Interval Walking",
    description: "Alternate between fast and slow walking, noticing changes in breath and body.",
    category: "exercise",
  },
  {
    id: 375,
    title: "Mindful Stair Climbing",
    description: "Climb stairs slowly and deliberately, focusing on each step and breath.",
    category: "exercise",
  },
  {
    id: 376,
    title: "Body Weight Circuit",
    description: "Perform a sequence of body weight exercises with mindful transitions.",
    category: "exercise",
  },
  {
    id: 377,
    title: "Mindful Cycling",
    description: "Cycle with awareness of pedal strokes, breath, and surroundings.",
    category: "exercise",
  },
  {
    id: 378,
    title: "Fascial Release",
    description: "Use foam rollers or balls to release fascial tension with mindful awareness.",
    category: "exercise",
  },
  {
    id: 379,
    title: "Movement Snacks",
    description: "Take brief 1-2 minute movement breaks throughout the day.",
    category: "exercise",
  },
  {
    id: 380,
    title: "Mindful Martial Arts",
    description: "Practice basic martial arts movements with focus on precision and breath.",
    category: "exercise",
  },
  {
    id: 381,
    title: "Animal Movements",
    description: "Mimic animal movements to explore different ways of moving your body.",
    category: "exercise",
  },
  {
    id: 382,
    title: "Mindful Jumping",
    description: "Practice simple jumping exercises with focus on landing softly.",
    category: "exercise",
  },
  {
    id: 383,
    title: "Breath-Focused Cardio",
    description: "Do cardio exercise while maintaining awareness of breath patterns.",
    category: "exercise",
  },
  {
    id: 384,
    title: "Mindful Cool-Down",
    description: "After exercise, take time to mindfully notice how your body feels.",
    category: "exercise",
  },
  {
    id: 385,
    title: "Tension and Release",
    description: "Systematically tense and release different muscle groups.",
    category: "exercise",
  },
  {
    id: 386,
    title: "Mindful Stretching",
    description: "Stretch with complete attention to sensation rather than achieving positions.",
    category: "exercise",
  },
  {
    id: 387,
    title: "Coordination Exercises",
    description: "Practice movements that challenge your coordination and body awareness.",
    category: "exercise",
  },
  {
    id: 388,
    title: "Mindful Agility",
    description: "Practice changing directions and speeds with full awareness.",
    category: "exercise",
  },
  {
    id: 389,
    title: "Barefoot Balance",
    description: "Practice balance exercises barefoot to increase foot awareness.",
    category: "exercise",
  },
  {
    id: 390,
    title: "Mindful Playground Workout",
    description: "Use playground equipment for a playful, mindful movement session.",
    category: "exercise",
  },
  {
    id: 391,
    title: "Slow Motion Movement",
    description: "Perform everyday movements in extremely slow motion with full awareness.",
    category: "exercise",
  },
  {
    id: 392,
    title: "Mindful Obstacle Course",
    description: "Create and navigate a simple obstacle course with full attention.",
    category: "exercise",
  },
  {
    id: 393,
    title: "Breath-Holding Walking",
    description: "Walk while holding breath for short intervals, then breathing normally.",
    category: "exercise",
  },
  {
    id: 394,
    title: "Mindful Partner Exercises",
    description: "Practice simple partner exercises requiring presence and coordination.",
    category: "exercise",
  },
  {
    id: 395,
    title: "Sensory Deprivation Movement",
    description: "Move with eyes closed to enhance proprioception and body awareness.",
    category: "exercise",
  },
  {
    id: 396,
    title: "Mindful Ball Play",
    description: "Bounce, throw, or roll a ball with complete attention to the movement.",
    category: "exercise",
  },
  {
    id: 397,
    title: "Micro-Movements",
    description: "Practice extremely small, subtle movements with full awareness.",
    category: "exercise",
  },
  {
    id: 398,
    title: "Mindful Resistance",
    description: "Move while imagining resistance, engaging muscles fully.",
    category: "exercise",
  },
  {
    id: 399,
    title: "Movement Improvisation",
    description: "Move spontaneously without planning, following what feels right in the moment.",
    category: "exercise",
  },
  {
    id: 400,
    title: "Mindful Rest Between Sets",
    description: "During workout rest periods, practice mindful breathing and body awareness.",
    category: "exercise",
  },

  // DOING THINGS DIFFERENTLY ACTIVITIES (50)
  {
    id: 401,
    title: "Non-Dominant Hand Day",
    description: "Use your non-dominant hand for routine tasks like brushing teeth or eating.",
    category: "different",
  },
  {
    id: 402,
    title: "Backward Walking",
    description: "Walk backward for short distances in a safe environment to engage different muscles and awareness.",
    category: "different",
  },
  {
    id: 403,
    title: "New Route to Work",
    description: "Take a completely different route to work or other regular destinations.",
    category: "different",
  },
  {
    id: 404,
    title: "Meal Role Reversal",
    description: "If you usually cook, let someone else cook. If you don't usually cook, prepare a meal.",
    category: "different",
  },
  {
    id: 405,
    title: "Opposite Schedule Day",
    description: "Do your daily routine in the reverse order where possible.",
    category: "different",
  },
  {
    id: 406,
    title: "Different Viewpoint",
    description: "Deliberately adopt a viewpoint opposite to your usual one on a non-critical issue.",
    category: "different",
  },
  {
    id: 407,
    title: "New Food Day",
    description: "Eat something you've never tried before or prepare a familiar food in a new way.",
    category: "different",
  },
  {
    id: 408,
    title: "Clothes Switch-Up",
    description: "Wear clothes you rarely wear or combine them in new ways.",
    category: "different",
  },
  {
    id: 409,
    title: "Digital Detox",
    description: "Spend a day without your usual digital devices, finding alternative activities.",
    category: "different",
  },
  {
    id: 410,
    title: "Furniture Rearrangement",
    description: "Rearrange furniture in one room to create a new perspective and energy.",
    category: "different",
  },
  {
    id: 411,
    title: "Shower Routine Change",
    description: "Change the order of your shower routine or water temperature.",
    category: "different",
  },
  {
    id: 412,
    title: "Different Reading Material",
    description: "Read something from a genre or subject area you normally wouldn't choose.",
    category: "different",
  },
  {
    id: 413,
    title: "New Music Exploration",
    description: "Listen to a music genre you don't typically enjoy or know much about.",
    category: "different",
  },
  {
    id: 414,
    title: "Meal Time Change",
    description: "Eat your meals at different times than usual, noticing effects on hunger and energy.",
    category: "different",
  },
  {
    id: 415,
    title: "Different Sleep Position",
    description: "Try sleeping in a different position than your usual one.",
    category: "different",
  },
  {
    id: 416,
    title: "Opposite Weather Choice",
    description: "If you normally avoid rain, go for a walk in it. If you stay in when hot, go out.",
    category: "different",
  },
  {
    id: 417,
    title: "New Hobby Day",
    description: "Spend time trying a hobby or activity you've never done before.",
    category: "different",
  },
  {
    id: 418,
    title: "Communication Style Switch",
    description: "If you're usually talkative, practice listening more. If quiet, speak up more.",
    category: "different",
  },
  {
    id: 419,
    title: "Opposite Energy Activity",
    description: "If you're high-energy, do something slow and calm. If low-energy, do something active.",
    category: "different",
  },
  {
    id: 420,
    title: "Different News Source",
    description: "Get your news from a source with a different perspective than your usual one.",
    category: "different",
  },
  {
    id: 421,
    title: "Sensory Focus Switch",
    description: "Focus on a different sense than you usually do (smell instead of sight, etc.).",
    category: "different",
  },
  {
    id: 422,
    title: "Opposite Social Choice",
    description: "If you'd normally say no to a social invitation, say yes. If yes, take alone time instead.",
    category: "different",
  },
  {
    id: 423,
    title: "New Language Exposure",
    description: "Spend 15 minutes learning basics of a language you've never studied.",
    category: "different",
  },
  {
    id: 424,
    title: "Different Transportation",
    description: "Use a different form of transportation than your usual method.",
    category: "different",
  },
  {
    id: 425,
    title: "Meal With No Distractions",
    description: "Eat a meal with no TV, phone, reading, or other distractions.",
    category: "different",
  },
  {
    id: 426,
    title: "Writing Hand Switch",
    description: "Practice writing with your non-dominant hand for 5 minutes.",
    category: "different",
  },
  {
    id: 427,
    title: "New Greeting Style",
    description: "Greet people differently than you normally would.",
    category: "different",
  },
  {
    id: 428,
    title: "Different Shopping Location",
    description: "Shop at a store you don't normally visit for your regular items.",
    category: "different",
  },
  {
    id: 429,
    title: "Opposite Time of Day Activity",
    description: "Do a morning activity in the evening or vice versa.",
    category: "different",
  },
  {
    id: 430,
    title: "New Seating Choice",
    description: "Sit in a different spot than usual at home, work, or in meetings.",
    category: "different",
  },
  {
    id: 431,
    title: "Different Walking Pace",
    description: "Walk much slower or faster than your normal pace.",
    category: "different",
  },
  {
    id: 432,
    title: "Opposite Temperature Shower",
    description: "Take a colder shower if you usually take hot ones, or vice versa.",
    category: "different",
  },
  {
    id: 433,
    title: "New Recipe Attempt",
    description: "Cook something completely outside your culinary comfort zone.",
    category: "different",
  },
  {
    id: 434,
    title: "Different Breathing Pattern",
    description: "Consciously breathe in a different pattern than your natural one for a few minutes.",
    category: "different",
  },
  {
    id: 435,
    title: "Opposite Posture",
    description: "If you usually slouch, practice sitting very straight. If rigid, practice relaxing.",
    category: "different",
  },
  {
    id: 436,
    title: "New Art Form Exploration",
    description: "Try an art form you've never attempted before, even for just 15 minutes.",
    category: "different",
  },
  {
    id: 437,
    title: "Different Morning Routine",
    description: "Change the order or content of your morning routine completely.",
    category: "different",
  },
  {
    id: 438,
    title: "New Conversation Topics",
    description: "Deliberately discuss topics you don't usually talk about with friends or family.",
    category: "different",
  },
  {
    id: 439,
    title: "Opposite Decision Day",
    description: "Make small decisions opposite to what you'd normally choose for one day.",
    category: "different",
  },
  {
    id: 440,
    title: "Different Eating Utensils",
    description: "Eat with your non-dominant hand or try using chopsticks if you normally use a fork.",
    category: "different",
  },
  {
    id: 441,
    title: "New Perspective Photos",
    description: "Take photos from unusual angles or perspectives you wouldn't normally consider.",
    category: "different",
  },
  {
    id: 442,
    title: "Clothes Inside Out",
    description: "Wear an item of clothing inside out (when appropriate) to shift perspective.",
    category: "different",
  },
  {
    id: 443,
    title: "Different Room Usage",
    description: "Use rooms in your home for purposes other than their intended function.",
    category: "different",
  },
  {
    id: 444,
    title: "Opposite Reaction Practice",
    description: "Practice responding differently than your instinctive reaction to minor situations.",
    category: "different",
  },
  {
    id: 445,
    title: "New Cultural Experience",
    description: "Participate in a cultural tradition or activity outside your own background.",
    category: "different",
  },
  {
    id: 446,
    title: "Different Thinking Style",
    description: "If you're analytical, try intuitive thinking. If intuitive, try analytical approaches.",
    category: "different",
  },
  {
    id: 447,
    title: "Opposite Hand Phone Use",
    description: "Hold and use your phone with your non-dominant hand for a day.",
    category: "different",
  },
  {
    id: 448,
    title: "New Environmental Sounds",
    description: "Spend time in an environment with sounds very different from your usual surroundings.",
    category: "different",
  },
  {
    id: 449,
    title: "Different TV/Movie Genre",
    description: "Watch something from a genre you typically avoid or have never explored.",
    category: "different",
  },
  {
    id: 450,
    title: "Backwards Reading",
    description: "Try reading a short paragraph backwards, word by word.",
    category: "different",
  },
]

// Get unique categories
const categories = [...new Set(suggestionsList.map((item) => item.category))]

// Map category names to display names
const categoryDisplayNames = {
  breath: "Breath Work",
  meditation: "Meditation",
  gratitude: "Gratitude",
  mindfulness: "Mindfulness",
  mood: "Mood",
  nature: "Nature",
  "self-awareness": "Self-Awareness",
  exercise: "Exercise",
  different: "Doing Things Differently",
}

export default function ActivitySuggestions() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null)

  // Filter suggestions based on search query
  const filteredSuggestions = suggestionsList.filter(
    (suggestion) =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
    setExpandedActivity(null) // Close any open activity when changing categories
  }

  // Toggle activity expansion
  const toggleActivity = (id: number) => {
    setExpandedActivity(expandedActivity === id ? null : id)
  }

  return (
    <Card className="mindful-card">
      <CardHeader>
        <CardTitle className="text-taupe-800 font-display">Activity Suggestions</CardTitle>
        <CardDescription className="text-taupe-600">
          Explore mindful activities to enhance your wellbeing
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-taupe-400" />
          <Input
            placeholder="Search activities..."
            className="pl-8 mindful-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        {searchQuery ? (
          // Search results view
          <div className="space-y-2">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="rounded-xl border border-sage-200/50 p-3 cursor-pointer hover:bg-sage-50/50 transition-all duration-200"
                  onClick={() => toggleActivity(suggestion.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-taupe-800">{suggestion.title}</h4>
                      <Badge variant="outline" className="mt-1 bg-mindful-sage text-taupe-700 border-sage-300">
                        {categoryDisplayNames[suggestion.category]}
                      </Badge>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform text-taupe-600",
                        expandedActivity === suggestion.id ? "transform rotate-180" : "",
                      )}
                    />
                  </div>
                  {expandedActivity === suggestion.id && (
                    <p className="mt-2 text-sm text-taupe-600 leading-relaxed">{suggestion.description}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-taupe-500 py-4">No activities found matching your search.</p>
            )}
          </div>
        ) : (
          // Category view
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryActivities = suggestionsList.filter((s) => s.category === category)
              const isExpanded = expandedCategory === category

              return (
                <div key={category} className="rounded-xl border border-sage-200/50 overflow-hidden">
                  <div
                    className="flex justify-between items-center p-3 cursor-pointer hover:bg-sage-50/50 transition-all duration-200"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-center">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 mr-2 text-taupe-600" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-2 text-taupe-600" />
                      )}
                      <h3 className="font-medium text-taupe-800 font-display">{categoryDisplayNames[category]}</h3>
                    </div>
                    <Badge className="bg-mindful-amber text-taupe-800 border-amber-300">
                      {categoryActivities.length}
                    </Badge>
                  </div>

                  {isExpanded && (
                    <div className="p-3 pt-0 border-t border-sage-200/30">
                      <div className="space-y-2 mt-2">
                        {categoryActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="rounded-lg bg-white/60 p-2 cursor-pointer hover:bg-white/80 transition-all duration-200 border border-sage-100"
                            onClick={() => toggleActivity(activity.id)}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-taupe-800">{activity.title}</h4>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform text-taupe-600",
                                  expandedActivity === activity.id ? "transform rotate-180" : "",
                                )}
                              />
                            </div>
                            {expandedActivity === activity.id && (
                              <p className="mt-2 text-sm text-taupe-600 leading-relaxed">{activity.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
