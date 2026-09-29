const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const orderForm = document.getElementById('order-form');
const selectedProductInput = document.getElementById('selected-product');
const selectedProductLabel = document.getElementById('selected-product-label');
const topicSelect = document.getElementById('order-topic');
const successMessage = document.getElementById('success-message');

function setSelectedProduct(productName) {
  if (selectedProductInput) {
    selectedProductInput.value = productName;
  }

  if (selectedProductLabel) {
    selectedProductLabel.textContent = productName || 'не выбран';
  }

  if (topicSelect && productName && topicSelect.value === '') {
    topicSelect.value = 'product';
  }
}

if (orderDialog) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setSelectedProduct(button.dataset.product);
      orderDialog.showModal();
    });
  });

  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }
}

const productFromUrl = new URLSearchParams(window.location.search).get('product');

if (productFromUrl) {
  setSelectedProduct(productFromUrl);
}

let messageTimer;

function showSuccessMessage() {
  successMessage.hidden = false;

  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => {
    successMessage.hidden = true;
  }, 6000);
}

if (orderForm && successMessage) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    showSuccessMessage();
    orderForm.reset();

    if (orderDialog && orderDialog.open) {
      orderDialog.close();
    }
  });
}
