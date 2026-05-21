const courseData = [
    {
        title: "Skill Test Manufacturing  ",
        description: "Learn the basics of Eps Skill Test (Manufacturing) information Video | HRDK",
        videoUrl: "https://www.youtube.com/embed/hR162woC9r4"
    },
    {
        title: "2025 Updated Skills Test for EPS-Topik CBT Passers - Using Grinder",
        description: "EPS-Topik CBT Passers - Using Grinder.",
        videoUrl: "https://www.youtube.com/embed/CKGbCkLgI6w"
    },
    {
        title: "2025 Updated Skills Test for EPS-Topik CBT Passers - Measuring & Cutting",
        description: "EPS-Topik CBT Passers - Measuring & Cutting",
        videoUrl: "https://www.youtube.com/embed/KQM7p2tVP08"
    },
    {
        title: "2025 Updated Skills Test for EPS-Topik CBT Passers - Pipe Bolting",
        description: "EPS-Topik CBT Passers - Pipe Bolting",
        videoUrl: "https://www.youtube.com/embed/_OqiOnkYV_w"
    }
];

const videoElement = document.getElementById('course-video');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const courseList = document.getElementById('course-list');

function addAutoplayAndMute(url) {
    if (url.includes('?')) {
        return `${url}&autoplay=1&mute=1`;  
    } else {
        return `${url}?autoplay=1&mute=1`;  
    }
}


function changeVideo(videoData, activeItem) {
    const autoplayUrl = addAutoplayAndMute(videoData.videoUrl);
    videoElement.src = autoplayUrl;
    videoTitle.textContent = videoData.title;
    videoDescription.textContent = videoData.description;

    const listItems = courseList.querySelectorAll('li');
    listItems.forEach(li => li.classList.remove('active'));


    activeItem.classList.add('active');
}

function populateCourseList() {
    courseData.forEach((course) => {
        const listItem = document.createElement('li');
        listItem.textContent = course.title;
        listItem.style.cursor = 'pointer';


        listItem.addEventListener('click', () => {
            changeVideo(course, listItem);
        });

        courseList.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    populateCourseList();
    changeVideo(courseData[0], courseList.firstChild); 
});
