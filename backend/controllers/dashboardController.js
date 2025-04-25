import Project from '../models/Project.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Helper to format month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getDashboardMetrics = async (req, res) => {
  try {
    // === Completion Stats (average percent per user) ===
    const completionStats = await Project.aggregate([
      { $unwind: '$progress' },
      {
        $group: {
          _id: '$progress.user',
          averagePercent: { $avg: '$progress.percent' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          _id: 0,
          user: { $arrayElemAt: ['$userInfo.username', 0] },
          percent: { $round: ['$averagePercent', 1] }
        }
      }
    ]);

    // === Assignment Stats (number of projects created per month) ===
    const assignmentStats = await Project.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.month': 1 }
      },
      {
        $project: {
          _id: 0,
          month: {
            $let: {
              vars: { months: monthNames },
              in: { $arrayElemAt: [monthNames, { $subtract: ['$_id.month', 1] }] }
            }
          },
          count: 1
        }
      }
    ]);

    res.json({ completionStats, assignmentStats });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    res.status(500).json({ message: 'Error fetching dashboard metrics' });
  }
};
