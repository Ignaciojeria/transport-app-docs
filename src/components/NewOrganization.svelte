<script>
  let organizationName = '';  // Variable para almacenar el nombre de la organización
  let showToast = false;  // Controla la visibilidad del toast
  let toastStyle = ''
  let toastMessage = '';  // Mensaje a mostrar en el toast
  let modalTitle = 'NUEVA ORGANIZACIÓN'
  let isInputDisabled = false
  let IsOrganizationCreated = false
  let apiKey = ''

  function handleInput(event) {
    // Aplica el filtro de manera inmediata al valor actual del input
    const filteredValue = event.target.value.replace(/[^a-zA-Z0-9-]/g, '');
    organizationName = filteredValue;  // Actualiza el estado con el valor filtrado
    event.target.value = filteredValue; // Actualiza el valor del input en el DOM
  }

  async function copyAPIKeyToClipboard() {
    try {
      await navigator.clipboard.writeText(apiKey);
      toastMessage = "API Key Copiada"
      toastStyle = 'alert-success'
      showToast = true; // Mostrar toast
    setTimeout(() => showToast = false, 5000); // Ocultar toast después de 5 segundos
    } catch (err) {
      console.error('Fallo al copiar:', err);
    }
  }

  function creatingOrganization(){
    modalTitle = "CREANDO ORGANIZACIÓN"
    isInputDisabled = true
  }

  function organizationCreated(){
    modalTitle = "ORGANIZACIÓN CREADA"
    toastMessage = "Organización creada"
    toastStyle = 'alert-success'
    showToast = true; // Mostrar toast
    IsOrganizationCreated = true
    setTimeout(() => showToast = false, 5000); // Ocultar toast después de 5 segundos
    IsOrganizationCreated = true
  }

  function undoCreatingOrganization(){
    modalTitle = "NUEVA ORGANIZACIÓN"
    isInputDisabled = false
  }

  async function createOrganization() {
    if (organizationName.length<=3) {
      toastMessage = "invalid input <= 3"
      toastStyle = 'alert-warning'
      showToast = true; // Mostrar toast
      setTimeout(() => showToast = false, 5000); // Ocultar toast después de 5 segundos
      return
    }
    try {
      creatingOrganization()
      const response = await fetch('https://api.ngs.global:443/v1/nats/subjects/organization.request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'nhg_2atLsmWBRcK7z3Mtu_DmLVjm3aHiYcfFQHoLrxWGhLtTZqhoPLfRN3rKmsmSWe',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: organizationName })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const base64Data = (await response.json()).data;

      // Decodificar la cadena base64 a una cadena de texto JSON
      const decodedJson = atob(base64Data);
      console.log(decodedJson);
      // Convertir la cadena de texto JSON en un objeto JavaScript
      const jsonObject = JSON.parse(decodedJson);
      
      apiKey = jsonObject.key

      organizationCreated()

    //  apiResponse = { ...data, data: atob(data.data) };

    } catch (e) {
      undoCreatingOrganization()
      toastMessage = e
      toastStyle = 'alert-error'
      showToast = true; // Mostrar toast
      setTimeout(() => showToast = false, 5000); // Ocultar toast después de 5 segundos
    }
  }
</script>

<button class="btn btn-wide my-4" onclick="my_modal_1.showModal()">NUEVA ORGANIZACIÓN</button>
<dialog id="my_modal_1" class="modal">

  <div class="modal-box">
    <h3 class="font-bold text-lg">{modalTitle} 
      {#if isInputDisabled && !IsOrganizationCreated}
      <span class="loading loading-ball loading-xl"></span>
      {/if}  
    </h3>
    <form on:submit|preventDefault>
      {#if !IsOrganizationCreated}
      <p class="py-4">Ingresa el nombre de la organización y presiona "CREAR ORGANIZACIÓN" para proceder.</p>
      <input type="text" on:input={handleInput} value={organizationName} placeholder="Nombre" required class="input input-bordered w-full max-w-xs" disabled={isInputDisabled}/>
      <button class="btn btn-primary my-4 block" on:click={createOrganization} disabled={isInputDisabled}>CREAR ORGANIZACIÓN 
      </button>
      {/if}
      {#if IsOrganizationCreated}
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">API Key</h2>
          <p>{apiKey}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={copyAPIKeyToClipboard}>Copiar</button>
          </div>
        </div>
      </div>
      {/if}
      <div class="modal-action">
        <button type="button" class="btn" onclick="my_modal_1.close()">Cerrar</button>
      </div>
    </form>
  </div>
  {#if showToast}
  <div class="toast">
    <div class="alert {toastStyle}">
      <span>{toastMessage}</span>
    </div>
  </div>
  {/if}
</dialog>