//
//  IssueViewModel.swift
//  IssueTracker
//
//  Created by 최광현 on 2020/11/04.
//

import UIKit

class IssueViewModel {
    var issueID: Int
    var title: String
    var milestoneTitle: String
    var labelBadges: [LabelBadge?]
    
    init(issue: Issue) {
        self.issueID = issue.issueID
        self.title = issue.title
        self.milestoneTitle = issue.milestoneTitle
        self.labelBadges = [LabelBadge(text: "aaaaa", colorCode: "#FF00AA"), LabelBadge(text: "b", colorCode: "#AA1435"), LabelBadge(text: "bugddd", colorCode: "#AABB44") ] //dummy label
    }
    
    func makeLabelStackView(size: CGSize) -> UIStackView {
        let stackView = UIStackView()
        stackView.frame.size = size
        //FIXME: 스택뷰 분배 수정 필요
        stackView.distribution = .fillEqually
        stackView.spacing = 1
        
        var sumOfLabelWidth = CGFloat.zero
        for badge in labelBadges {
            guard let badge = badge else { break }
            sumOfLabelWidth += badge.frame.size.width
            //남은 자리 없으면  .. 으로 처리
            guard sumOfLabelWidth < stackView.frame.size.width else {
                badge.text = " .. "
                stackView.addArrangedSubview(badge)
                badge.translatesAutoresizingMaskIntoConstraints = false
                badge.setContentHuggingPriority(.defaultLow, for: .horizontal)
                break
            }
            stackView.addArrangedSubview(badge)
        }
        return stackView
    }
     
}

extension IssueViewModel: Hashable {
    static func == (lhs: IssueViewModel, rhs: IssueViewModel) -> Bool {
        lhs.issueID == rhs.issueID
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(issueID)
    }
}