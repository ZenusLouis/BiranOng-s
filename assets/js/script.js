document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);

    if (targetId === "top") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetElement = document.getElementById(targetId);
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = window.innerHeight / 2 - targetElement.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  });
});
function displayProjects() {
  const projectContainer = document.getElementById('projectContainer');
  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'col-4 col-6-medium col-12-small';
    projectDiv.innerHTML = `
          <section class="box style1">
              <div class="image featured"><img src="${project.image}" alt=""></div>
              <h3>${project.title}</h3>
              <button class="button primary" onclick="openModal('${project.title}', '${project.description}', '${project.image}', '${project.link}')">Details</button>
          </section>
      `;
    projectContainer.appendChild(projectDiv);
  });
}

function openModal(index) {
  const project = projects[index];
  document.getElementById('modalTitle').innerText = project.title;
  document.getElementById('modalDescription').innerText = project.brief;
  document.getElementById('modalImage').src = project.image || ""; // Add a default image if available
  document.getElementById('modalLink').href = project.link;
  document.getElementById('modalToolsList').innerText = project.tools.join(', ');
  document.getElementById('projectModal').style.display = "block";
}

function closeModal() {
  document.getElementById('projectModal').style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById('projectModal')) {
    closeModal();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const certificateImages = document.querySelectorAll('.certificate-logo img');

  certificateImages.forEach(img => {
    img.addEventListener('click', function () {
      const imageUrl = this.getAttribute('src');

      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'overlay';

      // Create image element for overlay
      const imgPopup = document.createElement('img');
      imgPopup.src = imageUrl;
      imgPopup.className = 'overlay-image';

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'overlay-close';
      closeButton.innerHTML = 'X';

      // Append image and close button to overlay
      overlay.appendChild(closeButton);
      overlay.appendChild(imgPopup);

      // Append overlay to body
      document.body.appendChild(overlay);

      // Close overlay when close button or overlay is clicked
      closeButton.addEventListener('click', function () {
        document.body.removeChild(overlay);
      });

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      });

      // Prevent closing overlay on click inside image
      imgPopup.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });
  });
});

function toggleMenu() {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('active'); // Toggle the 'active' class to show/hide menu
}