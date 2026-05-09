import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Expert from './models/Expert.js';

dotenv.config();

const generateSlots = () => {
  const slots = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const timeSlots = [
      { time: '09:00', isBooked: false },
      { time: '10:00', isBooked: false },
      { time: '11:00', isBooked: false },
      { time: '14:00', isBooked: false },
      { time: '15:00', isBooked: false },
      { time: '16:00', isBooked: false },
    ];

    slots.push({
      date: dateStr,
      slots: timeSlots,
    });
  }

  return slots;
};

const seedExperts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Expert.deleteMany({});
    console.log('Cleared existing experts');

    const experts = [
      {
        name: 'Sarah Johnson',
        category: 'Web Development',
        experience: 8,
        rating: 4.8,
        bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable web applications.',
        availableSlots: generateSlots(),
      },
      {
        name: 'Mike Chen',
        category: 'Mobile Development',
        experience: 6,
        rating: 4.6,
        bio: 'iOS and Android specialist. Expert in React Native and native iOS development. Helped 50+ startups launch their apps.',
        availableSlots: generateSlots(),
      },
      {
        name: 'Emma Davis',
        category: 'UI/UX Design',
        experience: 7,
        rating: 4.9,
        bio: 'Creative designer with focus on user experience. Worked with Fortune 500 companies on product design.',
        availableSlots: generateSlots(),
      },
      {
        name: 'Raj Patel',
        category: 'Data Science',
        experience: 10,
        rating: 4.7,
        bio: 'Data scientist and ML engineer. Specialize in predictive analytics and deep learning models.',
        availableSlots: generateSlots(),
      },
      {
        name: 'Alex Thompson',
        category: 'Cloud Architecture',
        experience: 12,
        rating: 4.8,
        bio: 'AWS certified architect. Expert in designing scalable cloud infrastructure and DevOps practices.',
        availableSlots: generateSlots(),
      },
      {
        name: 'Lisa Wong',
        category: 'DevOps',
        experience: 9,
        rating: 4.7,
        bio: 'DevOps engineer with extensive experience in CI/CD pipelines, Docker, and Kubernetes.',
        availableSlots: generateSlots(),
      },
    ];

    const result = await Expert.insertMany(experts);
    console.log(`Successfully seeded ${result.length} experts`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedExperts();
