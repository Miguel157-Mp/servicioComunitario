using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.Resources;
using System.Reflection;



namespace NodeServerLauncher
{   

    public partial class MainForm : Form
    {
        private Process? serverProcess;
        private bool isServerRunning = false;
        private const string ConfigFile = "config.txt";

        public MainForm()
        {
            
            InitializeComponent();
    try
    {
        var rm = new System.Resources.ResourceManager("NodeServerLauncher.Properties.Resources", typeof(MainForm).Assembly);
        var iconObj = rm.GetObject("usmLogo.ico");
        if (iconObj is Icon icon)
            this.Icon = icon;
        else if (iconObj is byte[] bytes)
            using (var ms = new System.IO.MemoryStream(bytes))
                this.Icon = new Icon(ms);
        else
            MessageBox.Show("No se pudo cargar el icono desde recursos.");
    }
    catch (Exception ex)
    {
        MessageBox.Show("Error al cargar el icono: " + ex.Message);
    }
            LoadLastPath();
            UpdateStatusIndicator();
        }

        private void LoadLastPath()
        {
            try
            {
                if (File.Exists(ConfigFile))
                {
                    txtFilePath.Text = File.ReadAllText(ConfigFile);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error loading last path: {ex.Message}");
            }
        }

        private void SaveLastPath()
        {
            try
            {
                File.WriteAllText(ConfigFile, txtFilePath.Text);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error saving last path: {ex.Message}");
            }
        }

        private void btnSelectFile_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "JavaScript files (*.js)|*.js|All files (*.*)|*.*";
                openFileDialog.Title = "Seleccionar archivo server.js";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    txtFilePath.Text = openFileDialog.FileName;
                    SaveLastPath();
                }
            }
        }

        private void btnRunServer_Click(object sender, EventArgs e)
        {
            if (isServerRunning)
            {
                MessageBox.Show("El servidor ya está en ejecución.", "Información", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            if (string.IsNullOrWhiteSpace(txtFilePath.Text) || !File.Exists(txtFilePath.Text))
            {
                MessageBox.Show("Por favor seleccione un archivo server.js válido", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            try
            {
                ProcessStartInfo startInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/K node \"{txtFilePath.Text}\" & title SERVIDOR_NODE_{Path.GetFileNameWithoutExtension(txtFilePath.Text)}",
                    UseShellExecute = true,
                    CreateNoWindow = false,
                    WindowStyle = ProcessWindowStyle.Normal
                };

                serverProcess = new Process();
                serverProcess.StartInfo = startInfo;
                serverProcess.EnableRaisingEvents = true;
                serverProcess.Exited += (s, ev) =>
                {
                    this.Invoke((System.Windows.Forms.MethodInvoker)delegate
                    {
                        isServerRunning = false;
                        UpdateStatusIndicator();
                        
                        
                    });
                };

                serverProcess.Start();
                isServerRunning = true;
                UpdateStatusIndicator();
                // Abre el navegador predeterminado con la URL
                System.Diagnostics.Process.Start(new ProcessStartInfo
                {
                    FileName = "http://127.0.0.1:3000/",
                    UseShellExecute = true
                });
                SaveLastPath();
                MessageBox.Show("Servidor Node.js iniciado correctamente", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }



        private void btnStopServer_Click(object sender, EventArgs e)
        {
            if (!isServerRunning)
            {
                var result = MessageBox.Show("El servidor no está en ejecución. ¿Desea iniciarlo ahora?",
                                            "Servidor no iniciado",
                                            MessageBoxButtons.YesNo,
                                            MessageBoxIcon.Question);

                if (result == DialogResult.Yes)
                {
                    btnRunServer_Click(sender, e);
                }
                return;
            }

            try
            {
                if (serverProcess != null && !serverProcess.HasExited)
                {
                    // Intenta cerrar amigablemente
                    bool closed = CloseConsoleWindow(serverProcess.Id);
                    serverProcess.WaitForExit(2000);

                    // Si no se cerró, fuerza el cierre
                    if (!serverProcess.HasExited)
                    {
                        serverProcess.Kill(true); // true para matar también procesos hijos
                        serverProcess.WaitForExit(2000);
                    }

                    isServerRunning = false;
                    UpdateStatusIndicator();
                    MessageBox.Show("Servidor detenido.", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al detener el servidor: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                if (serverProcess != null)
                {
                    serverProcess.Dispose();
                    serverProcess = null;
                }
            }
        }
        // ...existing code...
        // Mejorar la búsqueda del título de la ventana

        [DllImport("user32.dll")]
        private static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);

        [DllImport("user32.dll")]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);


        private bool CloseConsoleWindow(int processId)
        {
            IntPtr targetHwnd = IntPtr.Zero;
            string jsPath = txtFilePath.Text.Trim();

            EnumWindows((hWnd, lParam) =>
            {
                // Verifica si la ventana pertenece al proceso correcto
                uint windowPid;
                GetWindowThreadProcessId(hWnd, out windowPid);
                if (windowPid != (uint)processId)
                    return true; // sigue buscando

                // Obtiene el título de la ventana
                var sb = new System.Text.StringBuilder(1024);
                GetWindowText(hWnd, sb, sb.Capacity);
                string title = sb.ToString();

                // Busca si el título contiene la ruta del archivo JS
                if (!string.IsNullOrEmpty(jsPath) && title.Contains(jsPath))
                {
                    targetHwnd = hWnd;
                    return false; // ¡encontrado! Detener la búsqueda
                }

                return true; // sigue buscando
            }, IntPtr.Zero);

            if (targetHwnd != IntPtr.Zero)
            {
                return PostMessage(targetHwnd, WM_CLOSE, IntPtr.Zero, IntPtr.Zero);
            }
            return false;
        }

        // Métodos para cerrar la ventana de la consola
        [DllImport("user32.dll")]
        private static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

        [DllImport("user32.dll")]
        private static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

        private const uint WM_CLOSE = 0x0010;



        private void UpdateStatusIndicator()
        {
            if (isServerRunning)
            {
                btnStatusIndicator.BackColor = Color.LimeGreen;
                btnStatusIndicator.Text = "SERVIDOR EN EJECUCIÓN";
                btnStatusIndicator.ForeColor = Color.Black;
            }
            else
            {
                btnStatusIndicator.BackColor = Color.Gray;
                btnStatusIndicator.Text = "SERVIDOR DETENIDO";
                btnStatusIndicator.ForeColor = Color.White;
            }
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            // Detener el servidor si está corriendo al cerrar la aplicación
            if (isServerRunning)
            {
                var result = MessageBox.Show("El servidor está en ejecución. ¿Desea detenerlo antes de salir?",
                                           "Servidor activo",
                                           MessageBoxButtons.YesNo,
                                           MessageBoxIcon.Question);

                if (result == DialogResult.Yes)
                {
                    btnStopServer_Click(null, EventArgs.Empty);
                }
            }
        }
    }
}