// TODO - 이슈 서비스 작성
import User from '@models/userModel';
import Issue from '@models/issueModel';
import IssueLabel from '@models/issueLabelModel';

const getAssigneeCandidates = async (req, res) => {
    try {
        const result = await User.findAll({attributes: ['userId', 'profile_url']});
        
        return res.status(200).json({ data: result, message: "success" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const changeAssignee = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Issue.update({
            assignees: req.body.userId
          },
          {
            where: { issueId: id },
          }
        );
        
        return res.status(200).json({ data: result, message: "success" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const addLabel = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = {
        issueId: id,
        name: req.body.name
      };
      const result = await IssueLabel.create(newData);

      return res.status(200).json({ data: result, message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
}

const removeLabel = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await IssueLabel.destroy({
            where: { issueId: id, name: req.body.labelName }
        });
  
        return res.status(200).json({ data: result, message: "success" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const removeAllLabel = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await IssueLabel.destroy({
            where: { issueId: id }
        });
  
        return res.status(200).json({ data: result, message: "success" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateTitle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await Issue.update(
      {
        title,
      },
      { where: { issueId: id } },
    );
    res.json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    next({
      status: 400,
      message: err.message,
    });
  }
};

const updateMilestone = async (req, res, next) => {
  try {
    const { id: issueId } = req.params;
    const { milestoneId } = req.body;
    await Issue.update(
      {
        milestoneId: milestoneId || null,
      },
      { where: { issueId } },
    );
    res.json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    next({
      status: 400,
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      userId: req.user.dataValues.userId,
      assignees: req.body.assignees,
      milestoneId: req.body.milestoneId,
    };
    const { issueId } = await Issue.create(data);
    const label = req.body.label;
    if (label.length) {
      label.forEach(async (name) => {
        await IssueLabel.create({ issueId, name });
      });
    }
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ message: 'Error' });
  }
};

export default { create, updateTitle, updateMilestone, getAssigneeCandidates, changeAssignee, addLabel, removeLabel, removeAllLabel };