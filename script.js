// ==========================================
// CAMPUS LOST & FOUND
// JAVASCRIPT FRONTEND
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const form =
    document.getElementById("itemForm");

const container =
    document.getElementById("itemsContainer");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const modal =
    document.getElementById("itemModal");

const modalContent =
    document.getElementById("modalContent");


// ==========================================
// SET TODAY'S DATE
// ==========================================

document.getElementById("date")
    .valueAsDate = new Date();


// ==========================================
// LOAD ITEMS
// ==========================================

loadItems();


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const type =
            document.querySelector(
                'input[name="type"]:checked'
            ).value;


        const item = {

            type: type,

            name:
                document
                .getElementById("itemName")
                .value
                .trim(),

            category:
                document
                .getElementById("category")
                .value,

            date:
                document
                .getElementById("date")
                .value,

            location:
                document
                .getElementById("location")
                .value
                .trim(),

            contact:
                document
                .getElementById("contact")
                .value
                .trim(),

            description:
                document
                .getElementById("description")
                .value
                .trim()

        };


        try {

            const response =
                await fetch(
                    "/api/items",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(item)
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Unable to add item"
                );

            }


            showToast(
                "Item reported successfully!",
                "✓"
            );


            form.reset();


            document
                .getElementById("date")
                .valueAsDate =
                new Date();


            loadItems();


            document
                .getElementById("browse")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        catch (error) {

            console.log(error);

            showToast(
                "Unable to connect to backend.",
                "!"
            );

        }

    }
);


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    loadItems
);


// ==========================================
// TYPE FILTER
// ==========================================

typeFilter.addEventListener(
    "change",
    loadItems
);


// ==========================================
// CATEGORY FILTER
// ==========================================

categoryFilter.addEventListener(
    "change",
    loadItems
);


// ==========================================
// LOAD ITEMS FROM PYTHON
// ==========================================

async function loadItems() {

    try {

        const response =
            await fetch("/api/items");


        const items =
            await response.json();


        renderItems(items);

    }


    catch (error) {

        console.log(error);

        container.innerHTML = "";

        emptyMessage.style.display =
            "block";

        emptyMessage.innerHTML = `
            <div class="empty-icon">⚠️</div>
            <h3>Backend not connected</h3>
            <p>Make sure you have started app.py.</p>
        `;

    }

}


// ==========================================
// RENDER ITEMS
// ==========================================

function renderItems(items) {

    const search =
        searchInput.value
        .toLowerCase()
        .trim();


    const type =
        typeFilter.value;


    const category =
        categoryFilter.value;


    const filtered =
        items.filter(function(item) {


            const searchableText =
                `
                ${item.name}
                ${item.description}
                ${item.location}
                ${item.category}
                `
                .toLowerCase();


            const searchMatch =
                searchableText
                .includes(search);


            const categoryMatch =
                category === "all" ||
                item.category === category;


            let typeMatch = true;


            if (type === "lost") {

                typeMatch =
                    item.type === "lost" &&
                    item.returned === 0;

            }


            if (type === "found") {

                typeMatch =
                    item.type === "found" &&
                    item.returned === 0;

            }


            if (type === "returned") {

                typeMatch =
                    item.returned === 1;

            }


            return (
                searchMatch &&
                categoryMatch &&
                typeMatch
            );

        });


    container.innerHTML = "";


    filtered.forEach(function(item) {

        const card =
            document.createElement("div");


        card.className =
            "item-card";


        const status =
            item.returned === 1
                ? "returned"
                : item.type;


        card.innerHTML = `

            <div class="item-top">

                <div>

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p class="item-category">
                        ${escapeHTML(item.category)}
                    </p>

                </div>

                <span class="badge ${status}">
                    ${status}
                </span>

            </div>


            <p>
                ${escapeHTML(
                    item.description
                )}
            </p>


            <div class="item-meta">

                <p>
                    📍
                    <strong>Location:</strong>
                    ${escapeHTML(item.location)}
                </p>

                <p>
                    📅
                    <strong>Date:</strong>
                    ${escapeHTML(item.date)}
                </p>

            </div>


            <div class="item-actions">

                <button
                    class="view-btn"
                    onclick="showDetails(${item.id})">

                    View Details

                </button>


                ${
                    item.returned === 0
                    ?
                    `
                    <button
                        onclick="markReturned(${item.id})">

                        ✓ Returned

                    </button>
                    `
                    :
                    ""
                }


                <button
                    class="delete"
                    onclick="deleteItem(${item.id})">

                    Delete

                </button>

            </div>

        `;


        container.appendChild(card);

    });


    if (filtered.length === 0) {

        emptyMessage.style.display =
            "block";

    }

    else {

        emptyMessage.style.display =
            "none";

    }


    updateStats(items);

}


// ==========================================
// SHOW ITEM DETAILS
// ==========================================

async function showDetails(id) {

    try {

        const response =
            await fetch("/api/items");


        const items =
            await response.json();


        const item =
            items.find(
                function(item) {
                    return item.id === id;
                }
            );


        if (!item) {
            return;
        }


        const status =
            item.returned === 1
                ? "Returned"
                : item.type;


        modalContent.innerHTML = `

            <div class="tag">
                ITEM DETAILS
            </div>

            <h2>
                ${escapeHTML(item.name)}
            </h2>

            <span class="badge ${status.toLowerCase()}">
                ${status}
            </span>


            <div class="modal-info">

                <div>
                    📂
                    <strong>Category:</strong>
                    ${escapeHTML(item.category)}
                </div>

                <div>
                    📍
                    <strong>Location:</strong>
                    ${escapeHTML(item.location)}
                </div>

                <div>
                    📅
                    <strong>Date:</strong>
                    ${escapeHTML(item.date)}
                </div>

                <div>
                    📞
                    <strong>Contact:</strong>
                    ${escapeHTML(item.contact)}
                </div>

                <div>
                    📝
                    <strong>Description:</strong>
                    ${escapeHTML(item.description)}
                </div>

            </div>

        `;


        modal.classList.add("show");

    }


    catch (error) {

        console.log(error);

    }

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    modal.classList.remove("show");

}


// Close modal when clicking outside

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


// ==========================================
// MARK RETURNED
// ==========================================

async function markReturned(id) {

    try {

        const response =
            await fetch(
                `/api/items/${id}/returned`,
                {
                    method: "PUT"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );

        }


        showToast(
            "Item marked as returned!",
            "✓"
        );


        loadItems();

    }


    catch (error) {

        showToast(
            "Unable to update item.",
            "!"
        );

    }

}


// ==========================================
// DELETE ITEM
// ==========================================

async function deleteItem(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this report?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/items/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        showToast(
            "Report deleted successfully.",
            "✓"
        );


        loadItems();

    }


    catch (error) {

        showToast(
            "Unable to delete report.",
            "!"
        );

    }

}


// ==========================================
// LOAD DEMO DATA
// ==========================================

async function loadDemoData() {

    try {

        await fetch(
            "/api/demo",
            {
                method: "POST"
            }
        );


        showToast(
            "Demo data added!",
            "✨"
        );


        loadItems();

    }


    catch (error) {

        showToast(
            "Unable to add demo data.",
            "!"
        );

    }

}


// ==========================================
// CLEAR ALL ITEMS
// ==========================================

async function clearAllItems() {

    const confirmDelete =
        confirm(
            "This will delete ALL reports. Continue?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        await fetch(
            "/api/items",
            {
                method: "DELETE"
            }
        );


        showToast(
            "All reports have been cleared.",
            "✓"
        );


        loadItems();

    }


    catch (error) {

        showToast(
            "Unable to clear reports.",
            "!"
        );

    }

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStats(items) {

    const total =
        items.length;


    const lost =
        items.filter(function(item) {

            return (
                item.type === "lost" &&
                item.returned === 0
            );

        }).length;


    const found =
        items.filter(function(item) {

            return (
                item.type === "found" &&
                item.returned === 0
            );

        }).length;


    const returned =
        items.filter(function(item) {

            return item.returned === 1;

        }).length;


    document.getElementById(
        "totalCount"
    ).textContent = total;


    document.getElementById(
        "lostCount"
    ).textContent = lost;


    document.getElementById(
        "foundCount"
    ).textContent = found;


    document.getElementById(
        "returnedCount"
    ).textContent = returned;

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message, icon) {

    const toast =
        document.getElementById("toast");


    document.getElementById(
        "toastMessage"
    ).textContent = message;


    document.getElementById(
        "toastIcon"
    ).textContent = icon;


    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}