class Followings {
    constructor(data) {
        this.data = data;
        this.pages = this.getNumberPages(10);
    }

    getNumberPages(nbPerPage) {
        let indexPage = 0;
        let result = [];
        let pages = [];

        for (let i = 0; i < this.data.length; i++) {

            if (i > 0) {
                if (i % nbPerPage === 0) {
                    result.push(new Page(indexPage, pages));
                    indexPage++;
                    pages = [];
                }
            }

            // Push to result and create new page array
            let newFollowing = new Following(
                this.data[i].userID,
                this.data[i].name,
                this.data[i].screenName,
                this.data[i].description,
                this.data[i].imgLink
            );

            pages.push(newFollowing);

            // End data
            if (i === this.data.length - 1) result.push(new Page(indexPage, pages));
        }

        return result;
    }

    setTagFolowing(pageIndex, screenName, tag, checked) {

        console.log(screenName + ' : ' + tag + ' : ' + pageIndex);

        if (pageIndex > this.pages.length) throw Error('Invalid page index.');

        let page = this.pages[pageIndex];
        let following = page.followings.find(e => e.screenName === screenName);

        if (following === undefined) throw Error('Following not found.');

        // Remove or add new tag
        if (checked) {
            if (following.tags.includes(tag)) return;
            following.tags.push(tag);
        } else {
            if (following.tags.includes(tag)) {
                following.tags.splice(following.tags.indexOf(tag));
            }
        }
    }
}

class Page {
    constructor(pageID, followings) {
        this.pageID = pageID;
        this.followings = followings;
    }
}

class Following {
    constructor(userID, name, screenName, description, imgLink) {
        this.userID = userID;
        this.name = name;
        this.screenName = screenName;
        this.description = description;
        this.imgLink = imgLink;
        this.tags = [];
    }

    addTag(tag) {
        this.tags.push(tag);
    }
}

module.exports = {
    Followings: Followings,
    Following: Following
};