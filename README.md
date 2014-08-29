#Basic Setup

<forked on github>

git clone https://github.com/{own-name}/BodyBudget.git<br>
	--This clones Master Repo to local machine

git checkout -b {branch name}<br>
	--This creates a named branch from cloned repo and checks you into it 
	                                                 
git remote add upstream git://github.com/ncaskey04/BodyBudget.git<br>
	--This sets your remote to the Master Repo for pulling down changes to keep your local work up to date


#Team Workflow

when ready for pull request:<br>
-- make sure you're in the right branch (master for merges). Can move into a branch with git checkout {branch name}<br>
-- git commit -am "commit message"<br>
-- git checkout master (local)<br>
-- git merge dev<br> 
-- git push origin master<br>
-- create pull request on your own github repo (origin)<br>
-- pull request is reviewed<br>
-- merge pull requests<br>

In dev branch: <br>
-- git pull upstream master<br>
-- work until ready for another pull request<br>

Note: Make sure you pull before push any changes

#Admin Workflow

Setup: <br>
-- create repo on github<br>
-- git clone that repo<br>
-- git check -b {branch name}<br>
-- git push origin dev (this creates dev branch on github)<br>

Worklfow:<br>
-- in local branch<br>