// server/controllers/AIController.js
const AIController = {
  // Xử lý yêu cầu chat
  handleChat: async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      // Giả lập phản hồi AI (thay thế bằng logic AI thực tế, ví dụ: gọi API chatbot)
      const response = `AI response to: ${message}`;
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: 'Error processing chat', details: error.message });
    }
  },

  // Gợi ý sản phẩm
  getProductRecommendations: async (req, res) => {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      // Giả lập gợi ý sản phẩm (thay thế bằng logic AI thực tế, ví dụ: dựa trên lịch sử mua hàng)
      const recommendations = await Product.getAll(); // Ví dụ đơn giản: lấy tất cả sản phẩm
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommendations', details: error.message });
    }
  },
};

module.exports = AIController;