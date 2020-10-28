//
//  MilestoneCell.swift
//  IssueTracker
//
//  Created by 김석호 on 2020/10/28.
//

import UIKit

class MilestoneCell: UICollectionViewCell {
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var dueDate: UILabel!
    @IBOutlet weak var description: UILabel!
    @IBOutlet weak var completePercentage: UILabel!
    @IBOutlet weak var openIssue: UILabel!
    @IBOutlet weak var closedIssue: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
}
